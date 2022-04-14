import {
    ShoppingIcon,
    CartIconContainer,
    ItemCount
} from './CartIcon.styled';

import { CartContext } from '../../contexts/CartContext';

import { useContext } from 'react';


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
        <CartIconContainer>
            <ShoppingIcon onClick={toggleCartOpen}/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;