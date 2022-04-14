import {
    CartDropdownContainer,
    EmptyObject,
    CartItems
} from './CartDropdown.styled';

import CartItem from '../cartItem/CartItem';
import Button from '../button/Button';
import {CartContext} from '../../contexts/CartContext';

import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';


const CartDropdown = () => {

    //*將cartItems帶入
    const {cartItems} = useContext(CartContext);

    //*將navigate功能帶入
    const navigate = useNavigate();

    //*onClick navigate功能
    const goToNavigation = () => {
        navigate('/checkout');
    };

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length
                    ? (cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    )))
                    : (<EmptyObject>
                        Your cart is empty
                       </EmptyObject>)
                }
            </CartItems>
            <Button onClick={goToNavigation}>
                GO TO CHECKOUT
            </Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;