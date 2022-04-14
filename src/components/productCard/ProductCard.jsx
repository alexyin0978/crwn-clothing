import {
  ProductCardContainer,
  Footer,
  Name,
  Price
} from './ProductCard.styled';

import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';

import {useContext} from 'react';

import {CartContext} from '../../contexts/CartContext';

const ProductCard = ({product}) => {

  //*destructure product
  const {imageUrl, name, price} = product;

  //*將addItemToCart帶入
  const {addItemToCart} = useContext(CartContext);

  //*設定button的onClick callback，並串連addItemToCart
  const addToCart = () => addItemToCart(product)

  return(
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button 
      buttonType={BUTTON_TYPE_CLASSES.inverted}
      onClick={addToCart}>
        Add To Cart
      </Button>
    </ProductCardContainer>
  )
}

export default ProductCard;