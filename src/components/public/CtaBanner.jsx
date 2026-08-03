/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : CtaBanner.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import siPas from "../../assets/mascot/si-pas.png";

import ctaBanner from "../../data/ctaBanner";

function CtaBanner() {
  const { title, highlight, description, button } = ctaBanner;

  return (
    /*==================================================
      CTA BANNER
    ==================================================*/

    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-primary/15 bg-accent p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/*==================================================
            CTA CONTENT
          ==================================================*/}

          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl font-bold leading-tight text-foreground text-balance sm:text-3xl">
              {title}
              <span className="block text-primary">{highlight}</span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <Link
              to="/category"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {button}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/*==================================================
            CTA IMAGE
          ==================================================*/}

          <div className="w-40 flex-shrink-0 sm:w-52">
            <img
              src={siPas}
              alt="Si Pas Mascot"
              loading="lazy"
              draggable="false"
              className="w-full select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBanner;
