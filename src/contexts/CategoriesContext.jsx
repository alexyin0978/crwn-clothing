import { createContext, useState, useEffect } from "react";

import SHOP_DATA from '../shop-data.js';
import { 
    addCollectionAndDocuments,
    getCategoriesAndDocuments
 } from "../utilities/firebase/Firebase";


//*actual context-value，初始值為empty obj
export const CategoriesContext = createContext({

    //a.context-value
    categoriesMap: {},
    
});


//*provider
export const CategoriesProvider = ({children}) => {

    //1.創建context-state，初始值為empty obj
    const [categoriesMap, setCategoriesMap] = useState([]);

    //2.用useEffect將shop-data寫入db
    //只需要寫入一次而已，因此跑完一次(log顯示'done')就可以刪除此useEffect
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    //3.用useEffect將categoryMap取出
    useEffect(()=>{

        //a.
        //因為是async function碰上useEffect
		//所以需要在useEffect的callback內另外再設定async function
        const getCategoriesMap = async () => {
            
            //a-1.將categoryMap取出
            const categoryMap = await getCategoriesAndDocuments();

            //a-2.將categoryMap儲存到context-value中
            setCategoriesMap(categoryMap);
        };

        //b.執行getCategoriesMap來取得"categoryMap"
        getCategoriesMap();

    }, []);

    //4.將context-state儲存到value內
    //然後傳給provider
    const value = {categoriesMap};


    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
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