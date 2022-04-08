import './CartDropdown.scss';

import CartItem from '../cartItem/CartItem';
import Button from '../button/Button';
import {CartContext} from '../../contexts/CartContext';

import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {

    //*將cartItems帶入
    const {cartItems} = useContext(CartContext);

    //*將navigate功能帶入
    const navigate = useNavigate();

    //*onClick navigate功能
    const goToNavigation = () => {
        navigate('/checkout');
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToNavigation}>
                GO TO CHECKOUT
            </Button>
        </div>
    )
}

export default CartDropdown;