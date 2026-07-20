/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Home.jsx
 Module  : Pages
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyNgepas from "../components/WhyNgepas";
import CtaBanner from "../components/CtaBanner";

/*==================================================
 COMPONENT
==================================================*/

function Home() {
  return (
    <>
  <Navbar />
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
