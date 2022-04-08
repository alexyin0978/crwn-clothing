import './CheckoutPage.scss';

import { CartContext } from '../../contexts/CartContext';
import CheckoutItem from '../../components/checkoutItem/CheckoutItem';

import { useContext } from 'react';

const CheckoutPage = () => {

    //*將cartItems, cartTotal的context匯入
    //cartItems用在展示name和quantity(資料)
    //cartTotal用來計算價錢總和
    const {cartItems, cartTotal} = useContext(CartContext);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className="header-block">
                    Product 
                </div>
                <div className="header-block">
                    Description
                </div>
                <div className="header-block">
                    Quantity
                </div>
                <div className="header-block">
                    Price
                </div>
                <div className="header-block">
                    Remove
                </div>
            </div>
            {cartItems.map(cartItem => (
                <CheckoutItem 
                key={cartItem.id} 
                cartItem={cartItem} />
            ))}
            <span className="Total">
                TOTAL: ${cartTotal}
            </span>
        </div>
    )
}

export default CheckoutPage;