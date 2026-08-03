/*==================================================
 NGEPAS REBORN
 Nama File : Hero.jsx
 Desc      : Hero section halaman utama (Version A - Fresh Minimal)
 Author    : Tim Ngepas
 Date      : 04 Agu 2026
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* Router */
import { Link } from "react-router-dom";

/* Icons */
import { Star, BadgeCheck, Truck, Headset } from "lucide-react";

/* Assets */
import siPas from "../../assets/mascot/si-pas.png";

/* Data */
import hero from "../../data/hero";

/*==================================================
 DERIVED DATA
==================================================*/

const trustIcons = {
  Star,
  BadgeCheck,
  Truck,
  Headset,
};

/*==================================================
 RENDER / UI
==================================================*/

function Hero() {
  const {
    badge,
    heading,
    description,
    primaryCta,
    secondaryCta,
    trusts,
  } = hero;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-3 pb-5 sm:px-6 sm:pt-5 sm:pb-6 lg:pt-6 lg:pb-8">
      {/*==================================================
        Hero Card
      ==================================================*/}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-green-50/90 to-white px-4 pt-5 pb-4 sm:rounded-3xl sm:px-8 sm:pt-7 sm:pb-6 lg:px-12 lg:pt-10 lg:pb-8">
        {/* Soft Glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-green-100/40 blur-3xl sm:h-56 sm:w-56" />

        <div className="relative z-10 flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/*==================================================
            Text Content
          ==================================================*/}
          <div className="w-full flex-1 text-center lg:text-left">
            {/* Badge */}
            <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-green-700 shadow-sm ring-1 ring-green-100 sm:mb-3 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {badge}
            </span>

            {/* Heading */}
            <h1 className="text-[1.55rem] font-extrabold leading-[1.25] tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {heading.line1}
              {" "}
              <span className="relative inline-block">
                <span className="relative z-10">{heading.highlight}</span>
                <span className="absolute bottom-[2px] left-0 z-0 h-[0.5em] w-full -rotate-1 bg-yellow-300/80 sm:bottom-[3px]" />
              </span>
              <br />
              <span className="text-green-600">{heading.line2}</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-2.5 max-w-[280px] text-[13px] leading-relaxed text-slate-500 sm:mt-3 sm:max-w-sm sm:text-sm lg:mx-0 lg:max-w-md">
              {description}
            </p>

            {/*==================================================
              Action Buttons
            ==================================================*/}
            <div className="mt-4 flex flex-col items-center gap-2 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3 lg:justify-start">
              <Link
                to={primaryCta.link}
                className="inline-flex w-full max-w-[180px] items-center justify-center rounded-xl bg-green-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98] sm:w-auto sm:px-6 sm:text-sm"
              >
                {primaryCta.text}
              </Link>

              <Link
                to={secondaryCta.link}
                className="inline-flex w-full max-w-[180px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] sm:w-auto sm:px-6 sm:text-sm"
              >
                {secondaryCta.text}
              </Link>
            </div>
          </div>

          {/*==================================================
            Mascot
          ==================================================*/}
          <div className="flex justify-center lg:flex-shrink-0">
            <div className="relative w-[8.5rem] sm:w-40 md:w-48 lg:w-56">
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-green-100/40 blur-2xl" />
              <img
                src={siPas}
                alt="Si Pas"
                className="relative z-10 w-full select-none drop-shadow-lg"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/*==================================================
        Trust Badges
      ==================================================*/}
      <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-4 sm:gap-3">
        {trusts.map((item) => {
          const Icon = trustIcons[item.icon];

          return (
            <div
              key={item.title}
              className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-2.5 shadow-sm sm:gap-2.5 sm:rounded-2xl sm:px-3 sm:py-3"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 sm:h-9 sm:w-9 sm:rounded-xl">
                <Icon size={16} strokeWidth={1.8} className="sm:hidden" />
                <Icon size={18} strokeWidth={1.8} className="hidden sm:block" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold leading-tight text-slate-900 sm:text-[13px]">
                  {item.title}
                </p>
                <p className="truncate text-[10px] leading-tight text-slate-500 sm:text-[11px]">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Hero;