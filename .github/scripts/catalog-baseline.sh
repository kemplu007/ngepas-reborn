#!/usr/bin/env bash
# ===========================================================================
# KEM-19 — Catalog Performance Baseline (READ-ONLY)
# ===========================================================================
# Skrip ini hanya mem-benchmark endpoint publik KEM-19 (GET /api/products)
# dari Railway production Ngepas. Skrip ini:
#   - TIDAK mengubah data, schema, cache, auth, atau konfigurasi apa pun.
#   - Tidak memakai header admin/JWT — identik dengan trafik publik biasa.
#   - Gagal hanya bila HTTP bukan 2xx, respons tak dapat di-parse, atau
#     skrip error. Latency TIDAK membuat CI merah (fase bukti, bukan SLA).
# Output:
#   - out/benchmark.csv   (1 baris per sampel + header)
#   - out/benchmark.json  (ringkasan median + sampel)
#   - out/summary.md      (ringkasan untuk GitHub Actions job summary)
# ===========================================================================
set -euo pipefail

BASE_URL="${CATALOG_BASE_URL:-https://ngepas-reborn-production-c3aa.up.railway.app}"
ENDPOINT="${BASE_URL}/api/products"
SAMPLES="${KEM19_SAMPLES:-7}"
WARMUP="${KEM19_WARMUP:-1}"
OUT_DIR="out"
TIMESTAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
SHA="${GITHUB_SHA:-$(git rev-parse HEAD 2>/dev/null || echo unknown)}"

mkdir -p "${OUT_DIR}"
CSV="${OUT_DIR}/benchmark.csv"
JSON="${OUT_DIR}/benchmark.json"
SUMMARY="${OUT_DIR}/summary.md"

echo "timestamp,http_status,bytes,product_count,tcp_s,ttfb_s,total_s" > "${CSV}"

TOTALS=()

run_request () {
  local RECORD="${1:-record}"
  local TMP
  TMP="$(mktemp)"
  local EXIT_CODE=0
  local HTTP STATUS BYTES TOTAL TTFB TCP JSON_OK COUNT
  HTTP="$(curl --max-time 20 --silent --show-error --output "${TMP}" \
    --write-out 'http=%{http_code}|bytes=%{size_download}|total=%{time_total}|ttfb=%{time_starttransfer}|tcp=%{time_connect}' \
    --get "${ENDPOINT}")" || EXIT_CODE=$?

  HTTP="$(echo "${HTTP}" | tr '\n' ' ')"
  STATUS="$(echo "${HTTP}" | sed -n 's/.*http=\([0-9]*\).*/\1/p')"
  BYTES="$(echo "${HTTP}" | sed -n 's/.*bytes=\([0-9]*\).*/\1/p')"
  TOTAL="$(echo "${HTTP}" | sed -n 's/.*total=\([0-9.]*\).*/\1/p')"
  TTFB="$(echo "${HTTP}" | sed -n 's/.*ttfb=\([0-9.]*\).*/\1/p')"
  TCP="$(echo "${HTTP}" | sed -n 's/.*tcp=\([0-9.]*\).*/\1/p')"

  if [ "${EXIT_CODE}" -ne 0 ] || [ -z "${STATUS}" ]; then
    echo "ERROR request_failed exit=${EXIT_CODE} url=${ENDPOINT}" >&2
    rm -f "${TMP}"
    return 1
  fi

  # KEM-19: payload validasi struktural, bukan penilaian kualitas konten.
  JSON_OK="$(jq -e 'if type=="object" and (.data|type=="array") then "ok" else error("structure_invalid") end' "${TMP}" 2>/dev/null | tr -d '"' || true)"
  COUNT="$(jq -r '.data | length' "${TMP}" 2>/dev/null || echo -1)"

  if [ "${JSON_OK}" != "ok" ]; then
    echo "ERROR structure_invalid url=${ENDPOINT}" >&2
    rm -f "${TMP}"
    return 2
  fi

  if [ "${RECORD}" = "record" ]; then
    echo "${TIMESTAMP},${STATUS},${BYTES},${COUNT},${TCP},${TTFB},${TOTAL}" >> "${CSV}"
    TOTALS+=("${TOTAL}")
  fi
  rm -f "${TMP}"
}

echo "==> Warming up (${WARMUP} request, not recorded)"
for _ in $(seq 1 "${WARMUP}"); do run_request warmup || true; done

echo "==> Recording ${SAMPLES} samples against ${ENDPOINT}"
for i in $(seq 1 "${SAMPLES}"); do
  run_request record || { echo "==> Run failed at sample ${i}"; exit 1; }
  sleep 1
done

# Ringkasan: median + min/max dari total_seconds.
if [ "${#TOTALS[@]}" -eq 0 ]; then
  echo "ERROR no_samples_recorded" >&2
  exit 1
fi

read -r MEDIAN MINV MAXV < <(printf '%s\n' "${TOTALS[@]}" | sort -n | awk '{a[NR]=$1} END {
  n=NR
  if (n%2==1) { mid=a[(n+1)/2] } else { mid=(a[n/2]+a[n/2+1])/2 }
  printf "%.3f %.3f %.3f\n", mid, a[1], a[n]
}')

TOTAL_BYTES="$(awk -F',' 'NR>1 {s+=$3} END {printf "%d", s}' "${CSV}")"
PRODUCTS="$(head -2 "${CSV}" | tail -1 | cut -d',' -f4)"

jq -n \
  --arg ts "${TIMESTAMP}" \
  --arg sha "${SHA}" \
  --arg url "${ENDPOINT}" \
  --argjson samples "${#TOTALS[@]}" \
  --argjson median "${MEDIAN}" \
  --argjson min "${MINV}" \
  --argjson max "${MAXV}" \
  --argjson total_bytes "${TOTAL_BYTES}" \
  --argjson products "${PRODUCTS}" \
  --rawfile csv "${CSV}" \
  '{
    timestamp: $ts,
    commit_sha: $sha,
    endpoint: $url,
    samples_recorded: $samples,
    total_seconds: { median: $median, min: $min, max: $max },
    total_bytes_all_samples: $total_bytes,
    product_count: $products,
    sample_rows_csv: ($csv | split("\n"))
  }' > "${JSON}"

cat > "${SUMMARY}" <<EOF
## KEM-19 Catalog Performance Baseline — ${TIMESTAMP}

| Metrik | Nilai |
|---|---|
| Endpoint | \`${ENDPOINT}\` |
| Commit (API) | \`${SHA}\` |
| Sampel tercatat | ${#TOTALS[@]} (+ ${WARMUP} warm-up) |
| Median total | ${MEDIAN} s |
| Min / Max total | ${MINV} s / ${MAXV} s |
| Produk dalam payload | ${PRODUCTS} |
| Total byte semua sampel | ${TOTAL_BYTES} |

Status: ${TOTAL_BYTES:+OK — endpoint publik 2xx dan payload dapat di-parse. Latency tidak digunakan sebagai gate CI.}
EOF

echo "==> Summary written to ${SUMMARY}"
exit 0
