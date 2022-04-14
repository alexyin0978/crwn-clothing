import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import { signUserOut } from "../../utilities/firebase/Firebase";
import CartIcon from "../cartIcon/CartIcon";
import CartDropdown from '../cartDropdown/CartDropdown';

import {
    NavigationContainer,
    LogoContainer,
    NavLinksContainer,
    NavLink
} from './Navigation.styled';

const Navigation = () => {


    //*user資訊放在這裡以供在登入後右上角可以保留顯示user
    const {currentUser, setCurrentUser} = useContext(UserContext);


    //*signOut功能的callback
    // const signOutHandler = async () => {
    //     await signUserOut();
    //     setCurrentUser(null);
    // }
    /*備註：
    因為setCurrentUser統一由UserContext內執行
    在Navigation內就不需要再做這件事
    因此在Nav內只需要onClick執行signUserOut即可
    但currentUser仍須保存以供判要render sign-in or sign-out
    */


    //*將cart-context-value帶入Nav
    const {isCartOpen} = useContext(CartContext);
  
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='shop'>
                        SHOP
                    </NavLink>
                    {/* 若user為登入狀態，則右上角顯示sign out */}
                    { currentUser ? 
                    (<NavLink
                     as='span'
                     onClick={signUserOut}
                     >SIGN OUT</NavLink>) :
                    (<NavLink to='auth'>
                        SIGN IN
                     </NavLink>)
                    }
                    <CartIcon />
                </NavLinksContainer>
            </NavigationContainer>
            {isCartOpen && <CartDropdown />}
            <Outlet />
        </Fragment>
    )
}

export default Navigation;