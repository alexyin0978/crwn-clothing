import {
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Price,
    Quantity,
    Arrow,
    Value,
    RemoveButton
} from './CheckoutItem.styled';

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
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094; {/* <符號 */}
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095; {/* >符號 */}
                </Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>
                &#10005; {/* X符號 */}
            </RemoveButton>
        </CheckoutItemContainer>
    )
} 

export default CheckoutItem;