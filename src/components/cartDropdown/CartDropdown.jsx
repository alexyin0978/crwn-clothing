import './CartDropdown.scss';

import CartItem from '../cartItem/CartItem';
import Button from '../button/Button';

import {useContext} from 'react';

import {CartContext} from '../../contexts/CartContext';

const CartDropdown = () => {

    //*將cartItems帶入
    const {cartItems} = useContext(CartContext);

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;