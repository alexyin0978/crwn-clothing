import { createContext, useState, useEffect } from "react";


//*helper function - addCartItem
const addCartItem = (cartItems, productToAdd) => {

    //1.透過id檢查productToAdd是否已存在cartItem
    const isProductItemExist = cartItems.find(cartItem => (
        cartItem.id === productToAdd.id
        //arr.find會回傳"第一個"符合條件的項目
    ))

    //2.若item已存在，則quantity+1
    if(isProductItemExist){
        return cartItems.map(cartItem => (
            //只修改新增的部分，其餘既有不修改
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity+1}
            : cartItem
        ))
    }

    //3.若item仍不存在cart清單，則return既有cartItem以及新增的項目
    return [...cartItems, {...productToAdd, quantity: 1}]

}


//*actual cart-context-value
export const CartContext = createContext({
    //1.isCartOpen的context-value,預設false(關閉)
    isCartOpen: false,

    //2.setIsCartOpen的context-value,預設empty function
    setIsCartOpen: () => {},

    //3.cartItem的context-value,預設empty array
    //cartItem與product-data構成一樣，只是多加了quantity這一項
    //id, name, price, imageUrl, quantity
    cartItems: [],

    //4.新增cartItem的onClick callback function
    //透過此callback，會trigger setCartItem
    //setCartItem會trigger helper function - addCartItem
    //addCartItem會檢查productToAdd是否已存在在cart清單
    //然後return更新的cart清單
    addItemToCart: () => {},

    //5.cartCount的context-value, 預設0
    cartCount: 0
})


//*provider
export const CartProvider = ({children}) => {

    //1.創建isCartOpen的context-state
    const [isCartOpen, setIsCartOpen] = useState(false);

    //2.創建cartItem的context-state
    const [cartItems, setCartItems] = useState([]);

    //3.定義addItemToCart
    //productToAdd為要新增的product資料
    //是直接從product資料取來，因此內容有：
    //id, name, price, imageUrl
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        //addCartItem為helper function
    };

    //4.創建cartCount的context-state
    const [cartCount, setCartCount] = useState(0);

    //5.使用useEffect
    //設定在每次cartItem有變動(quantity)時，cartCount+1
    useEffect(()=>{

        //a.累加quantity
        const accItemCount = cartItems.reduce((total, charItem)=>(
            total + charItem.quantity
        ), 0);

        //b.將累加值儲存到cartCount內
        setCartCount(accItemCount);

    }, [cartItems]);

    //6.將context-state裝進value傳遞給provider
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount
    };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}