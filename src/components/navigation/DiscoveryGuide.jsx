/*==================================================
 NGEPAS REBORN
 File    : DiscoveryGuide.jsx
 Module  : Navigation Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Check, ChevronDown, ChevronUp, Compass, ListChecks, Scale, Search } from "lucide-react";
import { useState } from "react";

/*==================================================
 DATA
==================================================*/

const guideSteps = [
  {
    key: "start",
    label: "Mulai",
    description: "Mulai dari kebutuhan atau kata kunci.",
    icon: Search,
    targetId: "discover-search",
  },
  {
    key: "explore",
    label: "Jelajah",
    description: "Temukan kategori dan pilihan relevan.",
    icon: Compass,
    targetId: "kategori-populer",
  },
  {
    key: "understand",
    label: "Pahami",
    description: "Baca alasan, rating, dan detail.",
    icon: ListChecks,
    targetId: "hasil-produk",
  },
  {
    key: "decide",
    label: "Putuskan",
    description: "Pilih kandidat yang paling Ngepas.",
    icon: Scale,
    targetId: "hasil-produk",
  },
];

/*==================================================
 COMPONENT
==================================================*/

function DiscoveryGuide({ activeStep = "start" }) {
  const [expanded, setExpanded] = useState(false);
  const activeGuideStep = guideSteps.find((step) => step.key === activeStep) || guideSteps[0];
  const ActiveIcon = activeGuideStep.icon;

  const handleStepSelect = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setExpanded(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-30 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="mx-auto max-w-md overflow-hidden rounded-np-lg border border-[var(--np-color-border)] bg-[var(--np-color-white)]/95 shadow-[var(--np-shadow-lg)] backdrop-blur">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="discovery-guide-panel"
          onClick={() => setExpanded((open) => !open)}
          className="flex min-h-[var(--np-touch-target)] w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--np-color-green-700)] text-[var(--np-color-white)]">
              <ActiveIcon size={17} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-[var(--np-color-ink)]">Panduan Ngepas</span>
              <span className="mt-0.5 block text-xs text-[var(--np-color-muted)]">
                Langkah {guideSteps.findIndex((step) => step.key === activeGuideStep.key) + 1} dari {guideSteps.length} · {activeGuideStep.label}
              </span>
            </span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--np-color-canvas)] text-[var(--np-color-ink)]">
            {expanded ? <ChevronDown size={18} aria-hidden="true" /> : <ChevronUp size={18} aria-hidden="true" />}
          </span>
        </button>

        <div
          id="discovery-guide-panel"
          aria-hidden={!expanded}
          inert={!expanded}
          className={`grid transition-[grid-template-rows,opacity] duration-np-normal ease-np-emphasized ${expanded ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden border-t border-[var(--np-color-border)] px-3 pb-3 pt-3">
            <div className="grid grid-cols-4 gap-2">
              {guideSteps.map(({ key, label, description, icon: Icon, targetId }, index) => {
                const isActive = key === activeGuideStep.key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleStepSelect(targetId)}
                    className={`min-h-24 rounded-np-md border px-2 py-2 text-center transition-[transform,background-color,border-color,color] duration-np-fast ease-np-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)] ${isActive ? "border-[var(--np-color-green-200)] bg-[var(--np-color-green-100)] text-[var(--np-color-green-800)]" : "border-[var(--np-color-border)] bg-[var(--np-color-white)] text-[var(--np-color-ink)] hover:border-[var(--np-color-green-200)] hover:bg-[var(--np-color-canvas)]"}`}
                  >
                    <span className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${isActive ? "bg-[var(--np-color-green-700)] text-[var(--np-color-white)]" : "bg-[var(--np-color-canvas)] text-[var(--np-color-muted)]"}`}>
                      {isActive ? <Check size={13} strokeWidth={2.5} aria-hidden="true" /> : index + 1}
                    </span>
                    <span className="mt-1 block text-[11px] font-bold">{label}</span>
                    <span className="mt-1 block line-clamp-2 text-[10px] leading-tight text-[var(--np-color-muted)]">{description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default DiscoveryGuide;

/*==================================================
 NOTES
==================================================*/

// The guide uses live Discover anchors instead of inventing navigation routes.
// The compact state keeps the decision journey visible without duplicating the side drawer.
// Motion is limited to transform, opacity, and grid expansion; reduced motion is handled globally.

/*==================================================
 END OF FILE
==================================================*/
