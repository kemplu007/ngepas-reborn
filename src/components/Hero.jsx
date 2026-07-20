/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Hero.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim, ChatGPT & Gemini
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import heroBg from "../assets/images/hero-bg.png";
import siPas from "../assets/mascot/si-pas.png";

import hero from "../data/hero";
import features from "../data/features";

import Button from "./Button";

/*==================================================
 HERO COMPONENT
==================================================*/

function Hero() {

  /*==================================================
    DATA
  ==================================================*/

  const {
    badge,
    heading,
    description,
    cta,
  } = hero;

  return (

    /*==================================================
      HERO SECTION
      Analogi: Kita pasang background dinding estetik tapi transparan dikit
    ==================================================*/

    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-10 lg:py-20" style={{ backgroundImage: `url(${heroBg})` }}>

      {/* Overlay putih transparan biar teks tetep kebaca jelas tapi background-nya kelihatan */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px]"></div>

      {/*==================================================
        HERO CONTAINER
      ==================================================*/
      }

      <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-center px-6">

        {/*==================================================
          HERO CONTENT (KIRI)
        ==================================================*/
        }

        <div className="relative z-10 w-[65%] space-y-4 sm:w-[60%] lg:w-1/2">

          {/* HERO BADGE */}
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 md:text-sm">
            {badge}
          </span>

          {/* HERO TITLE */}
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {heading.title}
            <br />
            <span className="text-green-600">
              {heading.highlight}
            </span>{" "}
            {heading.subtitle}
          </h1>

          {/* HERO DESCRIPTION */}
          <p className="max-w-sm text-xs leading-5 text-slate-600 sm:text-sm md:text-base">
            {description}
          </p>

          {/* HERO BUTTON */}
          <div className="pt-1">
            <Button>
              {cta.text}
            </Button>
          </div>

          {/* HERO FEATURES */}
          <ul className="space-y-1.5 pt-1 text-xs md:text-sm">
            {features.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-medium text-slate-700"
              >
                <span className="flex items-center justify-center rounded-full bg-green-100 p-0.5 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

        </div>

        {/*==================================================
          HERO IMAGE (KANAN BAWAH - POSISI AMAN)
        ==================================================*/
        }

        <div className="absolute bottom-0 right-[-15px] z-0 flex w-[50%] items-end justify-end sm:right-0 sm:w-[45%] lg:relative lg:bottom-auto lg:right-auto lg:w-1/2 lg:justify-center">
          
          <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-md">
            {/* Efek glow */}
            <div className="absolute inset-0 scale-90 rounded-full bg-green-400/20 blur-3xl"></div>
            
            <img
              src={siPas}
              alt="Si Pas"
              loading="eager"
              draggable="false"
              className="relative z-10 w-full drop-shadow-xl"
            />
          </div>

        </div>

      </div>

    </section>

  );
}

/*==================================================
 EXPORT
==================================================*/

export default Hero;
