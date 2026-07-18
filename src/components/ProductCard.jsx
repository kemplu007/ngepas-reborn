
/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductCard.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

        /*==================================================
 COMPONENT
==================================================*/

function ProductCard({product}) {
    return (
        <div
            className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            "
        >
            {/*==================================================
             PRODUCT IMAGE
            ==================================================*/}
            <div className="h-56 overflow-hidden bg-slate-100">
    <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover"
    />
</div>

            {/*==================================================
             PRODUCT CONTENT
            ==================================================*/}
            <div className="space-y-3 p-5">

                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {product.category}
                </p>

                <p className="text-2xl font-bold text-green-600">
                  {product.price}
                </p>

                <button
                    className="
                    w-full
                    rounded-xl
                    bg-green-600
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                    "
                >
                    Lihat Produk
                </button>

            </div>

        </div>
    );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductCard;