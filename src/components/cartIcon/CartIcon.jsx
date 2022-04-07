import './CartIcon.scss';

import {ReactComponent as ShoppingIcon} 
from '../../assets/shopping-bag.svg';

import { useContext } from 'react';

import { CartContext } from '../../contexts/CartContext';

const CartIcon = () => {

    //*將cart-context-value帶入CartIcon
    const {
        isCartOpen, 
        setIsCartOpen,
        cartCount
    } = useContext(CartContext);


    //*使用onClick將isCartOpen改為相反
	//true->false, false->true
    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    };


    return(
        <div className='cart-icon-container'>
            <ShoppingIcon 
            className='shopping-icon' 
            onClick={toggleCartOpen}/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;