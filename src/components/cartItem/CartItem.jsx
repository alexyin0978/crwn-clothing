import './CartItem.scss';

const CartItem = ({cartItem}) => {

    //*destructure cartItem
    const {imageUrl, name, price, quantity} = cartItem;

    return(
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    ${price} X {quantity}
                </span>
            </div>
        </div>
    )
}

export default CartItem;