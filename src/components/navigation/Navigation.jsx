import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/UserContext";
import { signUserOut } from "../../utilities/firebase/Firebase";

import './Navigation.scss';

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

  
       return(
        <Fragment>
            <div className="navigation">
                <Link to='/' className="logo-container">
                    <CrwnLogo />
                </Link>
                <div className="nav-links-container">
                    <Link to='shop' className="nav-link">
                        SHOP
                    </Link>
                    {/* 若user為登入狀態，則右上角顯示sign out */}
                    { currentUser ? 
                    (<span 
                     className="nav-link"
                     onClick={signUserOut}
                     >SIGN OUT</span>) :
                    (<Link to='auth' className="nav-link">
                        SIGN IN
                     </Link>)
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;