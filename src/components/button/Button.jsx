import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton
} from './Button.styled';

/*
三種button
1.base
2.google
3.inverted
*/

//1.創造style obj並export
//內容定義當今天輸入什麼key, 會得到相對應style-compo
export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
};

//2.創造get style obj的function
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {

    //a.此處return一個obj, 以方便定義getButton輸入arg會得到什麼style
    /*可以把此obj看成
    {
    base: BaseButton, 
    google-sign-in: GoogleSignInButton,
    inverted: InvertedButton
    }
    因此getButton(google-sign-in) = obj[google-sign-in] = GoogleSignInButton
    */
    return(
        {
            [BUTTON_TYPE_CLASSES.base]: BaseButton,
            [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
            [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
        }[buttonType]
    );
};

const Button = ({children, buttonType, ...otherProps}) => {

    //3.製作button tag
    const CustomButton = getButton(buttonType);
    //如此一來，只需要在CustomButtom內定義buttonType='...'
	//即可取得相對應button style

    return(
        <CustomButton {...otherProps}>
            {children}  
        </CustomButton>
    )
};

export default Button;