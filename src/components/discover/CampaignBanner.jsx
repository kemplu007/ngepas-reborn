/*==================================================
 NGEPAS REBORN
 File    : CampaignBanner.jsx
 Module  : Reusable Campaign Banner
==================================================*/

import { ArrowRight, Sparkles } from "lucide-react";

function CampaignBanner({ campaign, onAction, className = "" }) {
  if (!campaign) return null;

  return (
    <section className={`mx-auto max-w-7xl px-4 pb-5 pt-5 sm:px-6 sm:pb-8 sm:pt-8 ${className}`} aria-labelledby={`${campaign.id}-title`}>
      <div className="relative isolate h-[clamp(238px,62vw,300px)] overflow-hidden rounded-[var(--np-radius-xl)] border border-emerald-100 bg-emerald-50 shadow-[var(--np-shadow-sm)] sm:h-[clamp(260px,30vw,360px)]">
        <img src={campaign.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-right mix-blend-multiply opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-55% to-white/10 sm:from-white sm:via-white/90 sm:via-48% sm:to-transparent" aria-hidden="true" />
        <div className="absolute -right-14 -top-16 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 flex h-full max-w-[74%] flex-col justify-center px-5 py-4 sm:max-w-[58%] sm:px-10 sm:py-8 lg:px-14">
          {campaign.eyebrow && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-sm sm:px-3 sm:py-1.5 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 sm:h-2 sm:w-2" />
              {campaign.eyebrow}
            </span>
          )}
          <h1 id={`${campaign.id}-title`} className="mt-2 max-w-[17rem] text-[clamp(1.4rem,5.2vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-4 sm:max-w-[27rem]">
            {campaign.title}
          </h1>
          {campaign.description && <p className="mt-2 line-clamp-2 max-w-[19rem] text-xs leading-5 text-slate-600 sm:mt-4 sm:text-sm sm:leading-6">{campaign.description}</p>}
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-5">
            <button type="button" onClick={onAction} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--np-radius-md)] bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:min-h-11 sm:px-4 sm:text-sm">
              {campaign.ctaLabel || "Mulai Cari"}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 right-3 z-[1] inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2.5 py-1.5 text-[9px] font-bold text-emerald-800 shadow-sm backdrop-blur sm:bottom-5 sm:right-5 sm:px-3 sm:py-2 sm:text-[10px]" aria-hidden="true">
          <Sparkles size={12} className="text-amber-500" aria-hidden="true" />
          {campaign.imageLabel || "Pilihan Ngepas"}
        </div>
      </div>
    </section>
  );
}

export default CampaignBanner;
