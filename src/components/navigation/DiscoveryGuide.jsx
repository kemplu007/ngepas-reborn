/*==================================================
 NGEPAS REBORN
 File    : DiscoveryGuide.jsx
 Module  : Navigation Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Check, ChevronDown, ChevronUp, Compass, ListChecks, Scale, Search } from "lucide-react";
import { useEffect, useState } from "react";

/*==================================================
 DATA
==================================================*/

const guideSteps = [
  { key: "start", label: "Mulai", icon: Search, targetId: "discover-search" },
  { key: "explore", label: "Jelajah", icon: Compass, targetId: "kategori-populer" },
  { key: "understand", label: "Pahami", icon: ListChecks, targetId: "hasil-produk" },
  { key: "decide", label: "Putuskan", icon: Scale, targetId: "hasil-produk" },
];

/*==================================================
 COMPONENT
==================================================*/

function DiscoveryGuide({ activeStep = "start", onStepChange, onStart, searchOpen = false }) {
  const [expanded, setExpanded] = useState(false);
  const activeIndex = Math.max(guideSteps.findIndex((step) => step.key === activeStep), 0);
  const activeGuideStep = guideSteps[activeIndex];
  const ActiveIcon = activeGuideStep.icon;

  useEffect(() => {
    if (!expanded) return undefined;

    const handleScroll = () => setExpanded(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expanded]);

  const handleStepSelect = (step) => {
    onStepChange?.(step.key);
    if (step.key === "start" && onStart) {
      onStart();
    } else {
      document.getElementById(step.targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpanded(false);
  };

  return (
    <div
      aria-hidden={searchOpen}
      inert={searchOpen}
      className={`fixed inset-x-4 bottom-3 z-30 transition-[transform,opacity] duration-np-normal ease-np-standard motion-reduce:transition-none lg:hidden ${searchOpen ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-md overflow-hidden rounded-np-pill border border-[var(--np-color-border)] bg-[var(--np-color-white)]/95 shadow-[var(--np-shadow-lg)] backdrop-blur">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="discovery-guide-panel"
          onClick={() => setExpanded((open) => !open)}
          className="flex min-h-[var(--np-control-height-lg)] w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--np-color-green-700)] text-[var(--np-color-white)]">
              <ActiveIcon size={16} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-[var(--np-color-ink)]">Panduan Ngepas</span>
              <span className="mt-0.5 block truncate text-[11px] text-[var(--np-color-muted)]" aria-live="polite">
                Langkah {activeIndex + 1} dari {guideSteps.length} · {activeGuideStep.label}
              </span>
            </span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--np-color-canvas)] text-[var(--np-color-ink)]">
            {expanded ? <ChevronUp size={17} aria-hidden="true" /> : <ChevronDown size={17} aria-hidden="true" />}
          </span>
        </button>

        <div
          id="discovery-guide-panel"
          aria-hidden={!expanded}
          inert={!expanded}
          className={`grid transition-[grid-template-rows,opacity] duration-np-normal ease-np-emphasized ${expanded ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden border-t border-[var(--np-color-border)] px-4 pb-3 pt-4">
            <div className="relative grid grid-cols-4 gap-1" aria-label="Tahapan Panduan Ngepas">
              <span className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-3.5 h-px bg-[var(--np-color-border)]" aria-hidden="true" />
              {guideSteps.map(({ key, label, icon: Icon, targetId }, index) => {
                const isActive = key === activeGuideStep.key;
                const isComplete = index < activeIndex;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleStepSelect({ key, targetId })}
                    aria-current={isActive ? "step" : undefined}
                    className="relative z-10 flex min-w-0 flex-col items-center gap-1 rounded-np-sm px-1 py-0.5 text-center transition-colors duration-np-fast ease-np-standard hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] active:scale-[var(--np-motion-scale-pressed)]"
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold transition-colors duration-np-fast ease-np-standard ${isActive ? "border-[var(--np-color-green-700)] bg-[var(--np-color-green-700)] text-[var(--np-color-white)]" : isComplete ? "border-[var(--np-color-green-200)] bg-[var(--np-color-green-100)] text-[var(--np-color-green-800)]" : "border-[var(--np-color-border)] bg-[var(--np-color-white)] text-[var(--np-color-muted)]"}`}>
                      {isComplete ? <Check size={13} strokeWidth={2.5} aria-hidden="true" /> : <Icon size={14} strokeWidth={2} aria-hidden="true" />}
                    </span>
                    <span className={`max-w-full truncate text-[10px] font-bold ${isActive ? "text-[var(--np-color-green-800)]" : "text-[var(--np-color-muted)]"}`}>{label}</span>
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

// Guide memakai anchor Discover yang live, bukan route fiktif.
// Default compact menjaga konten tetap menjadi fokus utama.
// Expanded state memakai stepper ringan agar tidak tampil seperti kumpulan kartu.
// Motion dibatasi pada opacity, grid expansion, dan press feedback berbasis token.

/*==================================================
 END OF FILE
==================================================*/
