import { createContext, useState, useEffect } from "react";

import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments } from "../utilities/firebase/Firebase";


//*actual context-value，初始值為empty array(empty json)
export const ProductsContext = createContext({

    //a.context-value
    products: [],
    
});


//*provider
export const ProductsProvider = ({children}) => {

    //1.創建context-state，初始值為mock-data
    const [products, setProducts] = useState([]);

    //2.用useEffect將shop-data寫入db
    //只需要寫入一次而已，因此跑完一次(log顯示'done')就可以刪除此useEffect
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    //3.將context-state儲存到value內
    //然後傳給provider
    const value = {products};


    return(
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

/*備註：
context分為兩種
1.actual context-value -> ProductsContext
2.provider of context-state -> ProductsProvider

在其他compo內，我們將資料儲存到context-value內
然後再由provider將context-value儲存到context-state內
並由provider將此context-state傳遞給children
*/