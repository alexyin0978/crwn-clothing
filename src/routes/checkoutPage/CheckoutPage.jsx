import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from './CheckoutPage.styled';

import { CartContext } from '../../contexts/CartContext';
import CheckoutItem from '../../components/checkoutItem/CheckoutItem';

import { useContext } from 'react';

const CheckoutPage = () => {

  //*將cartItems, cartTotal的context匯入
  //cartItems用在展示name和quantity(資料)
  //cartTotal用來計算價錢總和
  const {cartItems, cartTotal} = useContext(CartContext);

  return(
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          Product 
        </HeaderBlock>
        <HeaderBlock>
          Description
        </HeaderBlock>
        <HeaderBlock>
          Quantity
        </HeaderBlock>
        <HeaderBlock>
          Price
        </HeaderBlock>
        <HeaderBlock>
          Remove
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map(cartItem => (
        <CheckoutItem 
        key={cartItem.id} 
        cartItem={cartItem} />
      ))}
      <Total>
        TOTAL: ${cartTotal}
      </Total>
    </CheckoutContainer>
  )
}

export default CheckoutPage;