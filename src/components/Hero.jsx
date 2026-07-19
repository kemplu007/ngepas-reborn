/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Hero.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import siPas from "../assets/mascot/si-pas.png";

import hero from "../data/hero";
import features from "../data/features";

import Button from "./Button";

/*==================================================
 HERO COMPONENT
==================================================*/

/*
 * Hero merupakan bagian pertama
 * yang dilihat oleh pengunjung.
 *
 * Komponen ini berisi headline,
 * deskripsi singkat, tombol aksi,
 * dan ilustrasi maskot Ngepas.
 */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/*==================================================
            HERO CONTENT
          ==================================================*/}

          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              🌿 Pilihan Terbaik untuk Rumahmu
            </span>

            <h1 className="leading-tight tracking-tight text-5xl font-extrabold text-slate-900 md:text-6xl">
              {hero.title}
              <br />
              <span className="text-green-600">{hero.highlight}</span>{" "}
              {hero.subtitle}
            </h1>

            <p className="max-w-xl text-lg leading-8 text-slate-600">
              {hero.description}
            </p>

            <Button>{hero.button}</Button>

            <ul className="space-y-3">
              {features.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <span className="text-green-600">✔</span>

                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/*==================================================
            HERO IMAGE
          ==================================================*/}

          <div className="flex items-center justify-center">
            <div
              className="
                flex
                h-96
                w-full
                max-w-md
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-green-100
                via-white
                to-green-50
                shadow-xl
              "
            >
              <img
                src={siPas}
                alt="Si Pas"
                loading="eager"
                draggable="false"
                className="w-72"
              />
            </div>
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
