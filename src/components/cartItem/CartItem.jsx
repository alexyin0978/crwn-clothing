import {
  CartItemContainer,
  ItemDetails,
  Name,
  Price
} from './CartItem.styled';

const CartItem = ({cartItem}) => {

  //*destructure cartItem
  const {imageUrl, name, price, quantity} = cartItem;

  return(
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>
          ${price} X {quantity}
        </Price>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;