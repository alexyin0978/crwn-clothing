import { useContext } from "react";

import { ProductsContext } from "../../contexts/ProductsContext";
import ProductCard from "../../components/productCard/ProductCard";

import './ShopPage.scss';

const ShopPage = () => {

    //1.將products-context-state帶入ShopPage
    //在這裡products會是在provider內設定的初始值mock-data
    const {products} = useContext(ProductsContext);


    return(
        <div className="products-container">
            {products.map((product) => (
                <ProductCard 
                key={product.id} 
                product={product}
                />
            ))}
        </div>
    )
}

export default ShopPage;