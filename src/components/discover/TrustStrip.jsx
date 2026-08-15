/*==================================================
 NGEPAS REBORN
 File    : TrustStrip.jsx
 Module  : Discover Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

/*==================================================
 DATA
==================================================*/

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Kurasi transparan",
    text: "Alasan rekomendasi jelas.",
  },
  {
    icon: Truck,
    title: "Bantu hemat waktu",
    text: "Pilihan lebih ringkas.",
  },
  {
    icon: BadgeCheck,
    title: "Bukan checkout",
    text: "Kamu tetap belanja di marketplace.",
  },
];

/*==================================================
 COMPONENT
==================================================*/

function TrustStrip({ className = "" }) {
  return (
    <aside
      className={`grid gap-3 border-y border-[var(--np-color-border)] py-4 sm:grid-cols-3 sm:gap-5 sm:border-y-0 sm:py-0 ${className}`}
      aria-label="Alasan menggunakan Ngepas"
    >
      {trustItems.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-start gap-3">
          <Icon
            size={20}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-[var(--np-color-green-700)]"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <strong className="block text-sm font-semibold leading-tight text-[var(--np-color-ink)]">
              {title}
            </strong>
            <span className="mt-1 block text-xs leading-[var(--np-leading-body)] text-[var(--np-color-muted)]">
              {text}
            </span>
          </div>
        </div>
      ))}
    </aside>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default TrustStrip;
