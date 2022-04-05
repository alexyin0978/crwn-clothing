import {createContext, useState, useEffect} from 'react';
import { 
    onAuthStateChangedListener,
    signUserOut,
    createUserDocumentFromAuth
    } from '../utilities/firebase/Firebase';


//*actual value(context的初始值)
export const UserContext = createContext({
    //1.empty context of an object(usually null)
    currentUser: null,
    //2.a function that does nothing for now 
    setCurrentUser: () => null
})




//*provider
//用來包裹stateProp的傳遞中心，提供context與state功能給該傳遞中心
export const UserProvider = ({children}) => {


    //1.context-state
    //預計裝user資料，初始值為空null
    const [currentUser, setCurrentUser] = useState(null);
    //這裡是"state"的初始值
    //上方UserContext則是"context"的初始值
    //我們將"context"放到sign-in與sign-up-form內
    //然後將user資料儲存在"context"內
    //這個"context"再寫入provider內的"value"
    //"value"則改變provider內的"state"狀態


    //2.創建一個object，把state與setState放在裏面，並傳給provider
    const value = {currentUser, setCurrentUser}


    //2.5.用signUserOut去sign-out之前登入的帳號
    //使用一次之後就可以刪除
    // signUserOut();
 

    //3.authChangeListener
    //放在useEffect內，dep為[]，意味此useEffect只call 1次
    //那就是在compo mount的時候
    //而compo會在每次userState有被更改(登入、登出)時，重新mount
    useEffect(()=>{


        //a.監控user auth變化
        //雖然useEffect只call一次
        //但onAuthStateChange本身會一直
        //open listening to auth change
        //為了在compo unmount後結束onAuthStateChange的listening
        //onAuthStateChange在執行後會return unsubscribe
        //此return function可以讓useEffect在compo unmount後
        //停止onAuthStateChange的listening
        //直到下一次remount
        const unsubscribe = onAuthStateChangedListener((user)=>{
            
            //一.若user存在(非null)，則將user回傳到createUserDocumentFromAuth
		    //以建立新user帳戶
		    //在createUserDocumentFromAuth內
		    //會用userSnapShot去檢查user帳戶是否已存在
            if(user){
                createUserDocumentFromAuth(user);
            }

            //二.將user資訊儲存到context-state內
            setCurrentUser(user);
            
        })


        //b.在unmount時，用return function去清除side-effect
        return unsubscribe; 


    },[])

    
    //4.provider
    //children wrapped inside provider can access the value
    //value內裝context-state
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}