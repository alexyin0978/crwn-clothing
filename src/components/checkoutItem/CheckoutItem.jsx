import './CheckoutItem.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/CartContext';

const CheckoutItem = ({cartItem}) => {

    //*destructure cartItem
    const {imageUrl, name, quantity, price} = cartItem;

    //*將clearItemFromCart, addItemToCart, removeItemFromCart
    //的context帶入
    //clearItemFromCart用在直接將項目從cart刪除
    //addItemToCart用在將quantity+1
    //removeItemFromCart用在將quantity-1
    const {
        clearItemFromCart,
        addItemToCart,
        removeItemFromCart
    } = useContext(CartContext);

    //*clearItem的callback
    const clearItemHandler = () => clearItemFromCart(cartItem);

    //*addItem的callback
    const addItemHandler = () => addItemToCart(cartItem);

    //*removeItem的callback
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div 
                className="arrow"
                onClick={removeItemHandler}>
                    &#10094; {/* <符號 */}
                </div>
                <span className="value">{quantity}</span>
                <div 
                className="arrow"
                onClick={addItemHandler}>
                    &#10095; {/* >符號 */}
                </div>
            </span>
            <span className="price">{price}</span>
            <div 
            className="remove-button"
            onClick={clearItemHandler}>
                &#10005; {/* X符號 */}
            </div>
        </div>
    )
} 

export default CheckoutItem;