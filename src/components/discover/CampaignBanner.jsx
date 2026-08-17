/*==================================================
 NGEPAS REBORN
 File    : CampaignBanner.jsx
 Module  : Reusable Hero / Value Proposition
 Style   : Mobile-first editorial rhythm; green primary action, quiet secondary action,
           and a two-column desktop composition derived from the approved Discover reference.
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { ArrowRight, Check, CirclePlay } from "lucide-react";
import Button from "../ui/Button";

/*==================================================
 COMPONENT
==================================================*/

function CampaignBanner({ campaign, onAction, className = "" }) {
  if (!campaign) return null;

  return (
    <section
      className={`mx-auto max-w-[var(--np-container-max)] px-[var(--np-gutter-mobile)] pb-[var(--np-space-5)] pt-[var(--np-space-2)] sm:px-[var(--np-gutter-tablet)] sm:pb-[var(--np-space-10)] sm:pt-[var(--np-space-5)] lg:px-[var(--np-gutter-desktop)] ${className}`}
      aria-labelledby={`${campaign.id}-title`}
    >
      <div className="overflow-hidden rounded-[var(--np-radius-md)] border border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)]">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-stretch">
          {/*============================================
            HERO COPY
          ============================================*/}
          <div className="px-[var(--np-space-4)] py-[var(--np-space-4)] sm:px-7 sm:py-7 lg:px-9 lg:py-10">
            {campaign.eyebrow && (
              <p className="text-xs font-bold tracking-wide text-[var(--np-color-green-700)] sm:text-sm">
                {campaign.eyebrow}
              </p>
            )}

            <h1
              id={`${campaign.id}-title`}
              className="mt-2 max-w-[24ch] text-[var(--np-text-h2)] font-extrabold leading-[var(--np-leading-heading)] tracking-tight text-[var(--np-color-ink)] sm:max-w-xl sm:text-[var(--np-text-h1)] lg:max-w-[17ch] lg:text-[var(--np-text-display)]"
            >
              {campaign.title}
            </h1>

            {campaign.description && (
              <p className="mt-2 max-w-[34rem] text-[var(--np-text-small)] leading-[var(--np-leading-body)] text-[var(--np-color-muted)] sm:mt-3 sm:text-[var(--np-text-body)]">
                {campaign.description}
              </p>
            )}

            {campaign.benefits?.length ? (
              <ul className="mt-3 grid gap-1.5 text-[var(--np-text-small)] font-medium leading-[var(--np-leading-body)] text-[var(--np-color-ink)] sm:mt-4 lg:max-w-md lg:gap-2">
                {campaign.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <Check size={18} className="mt-0.5 shrink-0 text-[var(--np-color-green-700)]" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-4 flex flex-col items-stretch gap-2 sm:mt-5 sm:flex-row sm:items-center sm:gap-3 lg:mt-6">
              <Button type="button" size="md" onClick={onAction} className="w-full sm:w-auto">
                {campaign.ctaLabel || "Mulai Cari Sekarang"}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>

              {campaign.secondaryCtaLabel && (
                <a
                  href={campaign.secondaryCtaHref || "#cara-kerja"}
                  className="inline-flex min-h-[var(--np-touch-target)] items-center justify-center gap-2 rounded-[var(--np-radius-sm)] border border-[var(--np-color-border-strong)] bg-[var(--np-color-white)] px-[var(--np-space-4)] text-sm font-semibold text-[var(--np-color-green-700)] transition-[transform,background-color,border-color] duration-np-fast ease-np-standard hover:border-[var(--np-color-green-300)] hover:bg-[var(--np-color-green-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2 active:scale-[var(--np-motion-scale-pressed)] motion-reduce:transition-none"
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
          <div className="relative mt-3 aspect-[2.35] overflow-hidden border-t border-[var(--np-color-border)] bg-[var(--np-color-surface-muted)] sm:mt-6 sm:aspect-[2.15] lg:mt-0 lg:min-h-[22rem] lg:aspect-auto lg:border-l lg:border-t-0">
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
        </div>

        {campaign.marketplaceLabel && (
          <p className="border-t border-[var(--np-color-border)] px-4 py-2 text-[var(--np-text-caption)] leading-[var(--np-leading-body)] text-[var(--np-color-muted)] sm:px-7 sm:py-2.5">
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
