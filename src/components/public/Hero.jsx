/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Hero.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

import heroBg from "../../assets/images/hero-bg.png";
import siPas from "../../assets/mascot/si-pas.png";

import hero from "../../data/hero";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  const { badge, heading, description, cta } = hero;

  return (
    /*==================================================
      HERO SECTION
    ==================================================*/

    <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      {/*==================================================
        HERO CONTAINER
      ==================================================*/}

      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-cover bg-center bg-no-repeat p-4 sm:p-8 shadow-sm"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/*==================================================
          BACKGROUND OVERLAY

          Menjaga kontras teks tanpa menutupi
          ilustrasi ruangan pada sisi kanan.
        ==================================================*/}

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent"></div>

        {/*==================================================
          HERO CONTENT
        ==================================================*/}

        <div className="relative z-10 flex flex-row items-center justify-between gap-2 sm:gap-6">
          {/*==================================================
            HERO TEXT
          ==================================================*/}

          <div className="z-20 flex-1 space-y-2 sm:space-y-3">
            {/* Badge */}

            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold text-accent-foreground sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              {badge}
            </span>

            {/* Heading */}

            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
              {heading.title}{" "}
              <span className="text-primary">{heading.highlight}</span>{" "}
              {heading.subtitle}
            </h1>

            {/* Description */}

            <p className="max-w-[220px] text-[14px] leading-relaxed text-muted-foreground sm:max-w-sm sm:text-sm">
              {description}
            </p>

            {/* CTA */}

            <div className="pt-2">
              <Link
                to="/category"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:px-5 sm:py-3 sm:text-sm"
              >
                {cta.text}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/*==================================================
            HERO IMAGE
          ==================================================*/}

          <div className="flex w-32 flex-shrink-0 justify-end self-end -mb-2 sm:w-56 sm:-mb-6 lg:w-64">
            <img
              src={siPas}
              alt="Si Pas Mascot"
              loading="eager"
              draggable="false"
              className="w-full select-none drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
