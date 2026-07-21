/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : CtaBanner.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import siPas from "../assets/mascot/si-pas.png";

import ctaBanner from "../data/ctaBanner";

function CtaBanner() {
  const { title, highlight, description, button } = ctaBanner;

  return (
    /*==================================================
      CTA BANNER
    ==================================================*/

    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/*==================================================
            CTA CONTENT
          ==================================================*/}

          <div className="max-w-xl">
            <h2 className="text-2xl font-bold leading-tight text-slate-900">
              {title}
              <span className="block text-emerald-700">{highlight}</span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {description}
            </p>

            <Link
              to="/category"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
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
