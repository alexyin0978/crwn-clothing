import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';


//1.actual context-value，初始值為empty array(empty json)
export const ProductsContext = createContext({

    //a.context-value
    products: [],
    
})


//2.provider
export const ProductsProvider = ({children}) => {

    //a.創建context-state，初始值為mock-data
    const [products, setProducts] = useState(PRODUCTS);

    //b.將context-state儲存到value內
    //然後傳給provider
    const value = {products};

    return(
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}

/*備註：
context分為兩種
1.actual context-value -> ProductsContext
2.provider of context-state -> ProductsProvider

在其他compo內，我們將資料儲存到context-value內
然後再由provider將context-value儲存到context-state內
並由provider將此context-state傳遞給children
*/