/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Home.jsx
 Module  : Pages
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import Hero from "../../components/public/Hero";

import Category from "../../components/public/Category";

import FeaturedProducts from "../../components/public/FeaturedProducts";

import WhyNgepas from "../../components/public/WhyNgepas";

import CtaBanner from "../../components/public/CtaBanner";

/*==================================================
 COMPONENT
==================================================*/

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <WhyNgepas />
      <CtaBanner />
      <FeaturedProducts />
    </>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Home;
