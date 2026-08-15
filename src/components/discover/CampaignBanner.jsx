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
      className={`mx-auto max-w-[var(--np-container-max)] px-[var(--np-gutter-mobile)] pb-[var(--np-space-12)] pt-[var(--np-space-6)] sm:px-[var(--np-gutter-tablet)] sm:pb-[var(--np-space-16)] sm:pt-[var(--np-space-8)] lg:px-[var(--np-gutter-desktop)] ${className}`}
      aria-labelledby={`${campaign.id}-title`}
    >
      <div className="overflow-hidden rounded-[var(--np-radius-xl)] border border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)]">
        {/*============================================
          HERO COPY
        ============================================*/}
        <div className="px-5 pb-0 pt-6 sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
          {campaign.eyebrow && (
            <p className="text-xs font-bold tracking-wide text-[var(--np-color-green-700)] sm:text-sm">
              {campaign.eyebrow}
            </p>
          )}

          <h1
            id={`${campaign.id}-title`}
            className="mt-3 max-w-[17ch] text-[var(--np-text-h1)] font-extrabold leading-[var(--np-leading-display)] tracking-tight text-[var(--np-color-ink)] sm:max-w-xl sm:text-[var(--np-text-display)]"
          >
            {campaign.title}
          </h1>

          {campaign.description && (
            <p className="mt-4 max-w-[34rem] text-[var(--np-text-body)] leading-[var(--np-leading-body)] text-[var(--np-color-muted)]">
              {campaign.description}
            </p>
          )}

          {campaign.benefits?.length ? (
            <ul className="mt-5 grid gap-3 text-sm font-medium leading-[var(--np-leading-body)] text-[var(--np-color-ink)] sm:max-w-xl sm:grid-cols-3 sm:gap-4">
              {campaign.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--np-color-green-700)]" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex min-h-[var(--np-control-height-lg)] items-center justify-center gap-2 rounded-[var(--np-radius-md)] bg-[var(--np-color-green-700)] px-5 py-3 text-sm font-bold text-white shadow-[var(--np-shadow-sm)] transition-[transform,background-color] duration-np-fast ease-np-standard hover:bg-[var(--np-color-green-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
            >
              {campaign.ctaLabel || "Mulai Cari Sekarang"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>

            {campaign.secondaryCtaLabel && (
              <a
                href={campaign.secondaryCtaHref || "#cara-kerja"}
                className="inline-flex min-h-[var(--np-control-height-lg)] items-center justify-center gap-2 rounded-[var(--np-radius-md)] px-4 py-3 text-sm font-semibold text-[var(--np-color-green-700)] transition-[transform,background-color] duration-np-fast ease-np-standard hover:bg-[var(--np-color-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
              >
                <CirclePlay size={17} aria-hidden="true" />
                {campaign.secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>

        {/*============================================
          HERO VISUAL
        ============================================*/}
        <div className="relative mt-6 aspect-[1.55] overflow-hidden border-t border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)] sm:mt-8 sm:aspect-[2.15] lg:mt-10 lg:aspect-[2.6]">
          <img
            src={campaign.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          {campaign.imageLabel && (
            <span className="absolute bottom-3 left-3 rounded-[var(--np-radius-pill)] bg-[var(--np-color-white)]/95 px-3 py-1.5 text-xs font-bold text-[var(--np-color-green-700)] shadow-[var(--np-shadow-sm)] sm:bottom-5 sm:left-5">
              {campaign.imageLabel}
            </span>
          )}
        </div>

        {campaign.marketplaceLabel && (
          <p className="border-t border-[var(--np-color-border)] px-5 py-3 text-xs leading-[var(--np-leading-body)] text-[var(--np-color-muted)] sm:px-8">
            {campaign.marketplaceLabel}
          </p>
        )}
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default CampaignBanner;
