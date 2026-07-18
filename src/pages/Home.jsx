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
import Hero from "../components/Hero"
import Category from "../components/Category";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductCard from "../components/ProductCard"
/*==================================================
 COMPONENT
==================================================*/

function Home() {
    return (
        <>
          
          <Navbar />
          <Hero />
          <Category />
          <FeaturedProducts />
        </>
    );
}

/*==================================================
 EXPORT
==================================================*/

export default Home;