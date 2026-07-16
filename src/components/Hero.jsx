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

import hero from "../data/hero";
import features from "../data/features";
import Button from "./Button";

/*==================================================
 COMPONENT
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

        <section className="w-full">

    <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

               <h1>

    {hero.title}

    <br />

    <span>{hero.highlight}</span>

    {" "}

    {hero.subtitle}

</h1>

                <p>
                  {hero.description}
                </p>

                <Button>
                  {hero.button}
                </Button>
              <ul>

    {

        features.map((item) => (

            <li key={item}>

                {item}

            </li>

        ))

    }

</ul>

            </div>

            <div className="hero-image">

                <img
                    src="#"
                    alt="Maskot Ngepas"
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