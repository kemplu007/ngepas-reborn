/*==================================================
 NGEPAS REBORN
 File    : CampaignBanner.jsx
 Module  : Reusable Hero / Value Proposition
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { ArrowRight, Check, CirclePlay } from "lucide-react";

/*==================================================
 COMPONENT
==================================================*/

function CampaignBanner({ campaign, onAction, className = "" }) {
  if (!campaign) return null;

  return (
    <section
      className={`mx-auto max-w-7xl px-4 pb-6 pt-5 sm:px-6 sm:pb-10 sm:pt-8 ${className}`}
      aria-labelledby={`${campaign.id}-title`}
    >
      <div className="overflow-hidden rounded-[var(--np-radius-lg)] border border-[var(--np-color-border)] bg-[var(--np-color-white)] shadow-[var(--np-shadow-sm)]">
        <div className="grid items-stretch lg:grid-cols-[1.04fr_0.96fr]">
          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            {campaign.eyebrow && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--np-color-green-700)] sm:text-sm">
                {campaign.eyebrow}
              </p>
            )}
            <h1 id={`${campaign.id}-title`} className="max-w-xl text-[clamp(1.8rem,7vw,3.25rem)] font-extrabold leading-[1.04] tracking-tight text-[var(--np-color-ink)]">
              {campaign.title}
            </h1>
            {campaign.description && (
              <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--np-color-muted)] sm:text-base sm:leading-7">
                {campaign.description}
              </p>
            )}
            {campaign.benefits?.length ? (
              <ul className="mt-5 grid gap-2 text-sm font-semibold text-[var(--np-color-ink)] sm:text-base">
                {campaign.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <Check size={18} className="mt-0.5 shrink-0 text-[var(--np-color-green-700)]" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onAction}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--np-radius-md)] bg-[var(--np-color-green-700)] px-4 py-3 text-sm font-bold text-white shadow-[var(--np-shadow-sm)] transition-[transform,background-color] duration-np-fast ease-np-standard hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
              >
                {campaign.ctaLabel || "Mulai Cari Sekarang"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              {campaign.secondaryCtaLabel && (
                <a
                  href={campaign.secondaryCtaHref || "#cara-kerja"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] px-4 py-3 text-sm font-bold text-[var(--np-color-ink)] transition-[transform,background-color,border-color] duration-np-fast ease-np-standard hover:border-emerald-200 hover:bg-[var(--np-color-canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
                >
                  <CirclePlay size={17} aria-hidden="true" />
                  {campaign.secondaryCtaLabel}
                </a>
              )}
            </div>
          </div>

          <div className="relative flex min-h-[15rem] items-center justify-center overflow-hidden bg-[var(--np-color-canvas)] p-5 sm:min-h-[20rem] sm:p-8 lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-emerald-100/60" aria-hidden="true" />
            <img
              src={campaign.image}
              alt=""
              aria-hidden="true"
              className="relative z-10 max-h-[17rem] w-full object-contain object-center mix-blend-multiply sm:max-h-[22rem]"
            />
            {campaign.imageLabel && (
              <span className="absolute bottom-4 left-4 z-20 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[var(--np-color-green-700)] shadow-sm backdrop-blur sm:bottom-6 sm:left-6 sm:text-xs">
                {campaign.imageLabel}
              </span>
            )}
          </div>
        </div>

        {campaign.marketplaceLabel && (
          <div className="flex items-center gap-2 border-t border-[var(--np-color-border)] px-5 py-3 text-xs font-semibold text-[var(--np-color-muted)] sm:px-8">
            <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
            {campaign.marketplaceLabel}
          </div>
        )}
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default CampaignBanner;
