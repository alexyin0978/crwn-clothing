import './Button.scss';

/*
三種button
1.default
2.google
3.inverted
用dynamic class來assign different style
*/
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
};

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button 
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
        >
            {children}  
        </button>
    )
};

export default Button;