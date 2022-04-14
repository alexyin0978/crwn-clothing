import { createContext, useState, useEffect } from "react";


//*helper function - addCartItem
const addCartItem = (cartItems, productToAdd) => {
  //1.透過id檢查productToAdd是否已存在cartItem
  const isProductItemExist = cartItems.find(cartItem => (
    cartItem.id === productToAdd.id
    //arr.find會回傳"第一個"符合條件的項目
  ));
  //2.若item已存在，則quantity+1
  if(isProductItemExist){
    return cartItems.map(cartItem => (
      //只修改新增的部分，其餘既有不修改
      cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity+1}
      : cartItem
    ))
  };
  //3.若item仍不存在cart清單，則return既有cartItem以及新增的項目
  return [...cartItems, {...productToAdd, quantity: 1}];
};


//*helper function - removeCartItem
const removeCartItem = (cartItems, cartItemToRemove) => {
  //1.找出要remove的item
  const selectItemToRemove = cartItems.find(cartItem => (
    cartItem.id === cartItemToRemove.id
  ));
  //2.檢查該item的quantity是否為1, 若為1則直接從cart刪除該item
  if(selectItemToRemove.quantity === 1){
    return cartItems.filter(cartItem => (
      //直接排除掉要刪除的item
      cartItem !== cartItemToRemove
    ))
  };
  //3.否則return cartItems, 要刪除的item的quantity-1
  return cartItems.map(cartItem => (
    //要刪除的項目在quantity-1
    //其餘保持原樣
    cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity-1}
    : cartItem
  ));
};


//*helper function - clearItem
const clearItem = (cartItems, cartItemToClear) => {
  //直接將item項目刪除
  return cartItems.filter(cartItem => (
    cartItem.id !== cartItemToClear.id
  ));
};


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
  cartCount: 0,

  //6.刪減cartItem的onClick callback function
  //透過此callback，會trigger setCartItem
  //setCartItem會trigger helper function - removeCartItem
  //removeCartItem會檢查cartItemToRemove的quantity是否為1
  //若為1,則直接將該item從cartItem刪除
  //然後return更新的cart清單
  removeItemFromCart: () => {},

  //7.刪除cartItem的onClick callback function
  //此callback會trigger setCartItems
  //setCartItems會trigger helper function - removeItem
  //removeItem會直接將item從cart內全刪除
  clearItemFromCart: () => {},

  //8.total的context-value, 預設0
  cartTotal: 0
});


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

  //6.定義removeItemFromCart
  //cartItemToRemove為要刪除的product資料
  //是直接從cartItem資料取來，因此內容有：
  //id, name, price, imageUrl, quantity
  //removeCartItem為helper function
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  //7.定義clearItemFromCart
  //cartItemToClear為要刪除的項目
  //clearItem為helper-function
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearItem(cartItems, cartItemToClear));
  };

  //8.創建cartTotal的context-state
  const [cartTotal, setCartTotal] = useState(0);

  //9.使用useEffect來監控每當cartItems變動時
  //便會重新setCartCount
  useEffect(()=>{

    //a.計算total的值
    const accTotalCount = cartItems.reduce((total, cartItem)=>(
      total + cartItem.quantity * cartItem.price
    ), 0);

    //b.將結果儲存到cartTotal內
    setCartTotal(accTotalCount);

  }, [cartItems]);

  //10.將context-state裝進value傳遞給provider
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return(
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};