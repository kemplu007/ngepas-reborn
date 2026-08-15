# Header + Hero Micro-wireframe v2

**Status:** Menunggu validasi user. Dokumen ini adalah acuan baru; prototype Header + Hero sebelumnya ditolak dan tidak menjadi baseline.

## Prinsip Visual yang Dikunci

> Bukan card dekoratif yang mengelilingi semua isi. Mockup resmi memakai **layout yang lega, copy yang kuat, CTA yang jelas, dan visual produk sebagai fokus kedua**.

Hero harus terasa seperti satu komposisi halaman, bukan kumpulan kotak. Border, radius, dan shadow hanya dipakai pada elemen yang memang memiliki fungsi sebagai control atau information strip. Tidak ada gradient berat, tidak ada badge tambahan di luar mockup, dan tidak ada elemen yang memaksa user membaca terlalu banyak sebelum CTA.

## Mobile ≤ 768px

```text
┌──────────────────────────────────────────────┐
│  ☰                 Ngepas.          ♧   ◯    │  identity row
├──────────────────────────────────────────────┤
│  ◯  Cari produk terbaik, kategori, atau merk…  ☷│  search row
└──────────────────────────────────────────────┘

  24px top rhythm

  Cari barang bagus
  itu susah.
  Biar Ngepas yang pilihin.

  Ngepas membandingkan produk dari berbagai marketplace
  untuk menemukan yang terbaik untukmu.

  ✓ Dibandingkan di banyak toko
  ✓ Pilih produk terbaik untukmu
  ✓ Hemat waktu & uang

  ┌──────────────────────────────────────────┐
  │        Mulai Cari Sekarang       →       │  primary CTA
  └──────────────────────────────────────────┘

  ┌──────────────────────────────────────────┐
  │      ◉  Cara Kerja Ngepas                │  secondary CTA
  └──────────────────────────────────────────┘

              [visual produk elektronik]

  ┌──────────────────────────────────────────┐
  │ Dibandingkan di 5+ marketplace           │
  │  Shopee   Tokopedia   Lazada   TikTok...  │
  └──────────────────────────────────────────┘
```

Mobile rules: content padding 24px; headline maximum three lines and no forced line break beyond the mockup; body copy appears once; benefits are three short rows with one leading check icon; primary CTA is visually dominant and secondary CTA is outline; product visual comes after the action area; marketplace strip closes the Hero. There is no extra eyebrow above the headline in the micro-wireframe unless it already exists in the approved asset.

## Desktop ≥ 1024px

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Ngepas.   [ ◯ Cari produk terbaik...              ☷ ]  ⚖  ♧  ◯       │
└──────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────┬───────────────────────────────────┐
  │ Cari barang bagus itu susah. │                                   │
  │ Biar Ngepas yang pilihin.    │        [phone + headset + camera]  │
  │                              │                                   │
  │ Ngepas membandingkan...      │                                   │
  │ ✓ Dibandingkan ...           │                                   │
  │ ✓ Pilih produk ...           │                                   │
  │ ✓ Hemat waktu ...            │                                   │
  │                              │                                   │
  │ [Mulai Cari Sekarang →]      │                                   │
  │ [◉ Cara Kerja Ngepas]        │                                   │
  │                              │                                   │
  │ [marketplace information strip below copy]                       │
  └──────────────────────────────┴───────────────────────────────────┘
```

Desktop rules: header is one compact row; Hero copy occupies the left half and visual occupies the right half; headline is the first visual anchor; benefit list is short; CTA pair stays together; marketplace strip belongs below the copy rather than floating as a decorative badge.

## Component Contract

| Area | Component | Allowed responsibility |
|---|---|---|
| Identity row | `DiscoverHeader` | Logo, hamburger, notification, account, and mobile/desktop header structure |
| Search row | `DiscoverHeader` | Search input and filter/quick-access affordance; no progressive morphing |
| Copy | `CampaignBanner` | Eyebrow only if present in approved mockup, headline, description, three benefits |
| Action | `CampaignBanner` | Primary CTA and secondary anchor to `#cara-kerja` |
| Visual | `CampaignBanner` | One product composition from approved asset/data |
| Marketplace | `CampaignBanner` | Short information strip, not a new navigation or offer engine |

## Acceptance Gate Before Coding

User harus menyetujui empat hal berikut: komposisi tidak terasa sebagai kumpulan card, headline menjadi fokus pertama, CTA dan visual memiliki urutan napas yang jelas, serta header mobile benar-benar mempertahankan identity row dan search row seperti mockup. Jika salah satu belum terasa benar, wireframe ini direvisi dulu—tidak ada coding ulang.

## References

[1]: `src/docs/assets/uiux-v1.1/reference/1000702670.jpg` — Mockup Hero / Value Proposition Discover.

[2]: `src/docs/assets/uiux-v1.1/reference/1000702671.jpg` — Mockup Header Discover Mobile & Desktop.

[3]: `src/docs/docs/mockup-wireframe-audit-v1.md` — Audit mockup dan keputusan awal wireframe.
