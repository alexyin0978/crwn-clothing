import './ProductCard.scss';

import Button from '../button/Button';

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
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button 
            buttonType='inverted'
            onClick={addToCart}>
                Add To Cart
            </Button>
        </div>
    )
}

export default ProductCard;