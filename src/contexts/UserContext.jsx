import {createContext, useState, useEffect} from 'react';

import { onAuthStateChangedListener, signUserOut } from '../utilities/firebase/Firebase';


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


    //只call一次的useEffect
    //那就是這個compo mount的時候
    // useEffect(()=>{
    //     //執行unsubscribe，可以讓compo unmount之後停止監控user資料
    //     const unsubscribe = onAuthStateChangedListener((user)=>{
    //         console.log(user)
    //     })
    //     return unsubscribe;
    // },[])

    
    //3.provider
    //children wrapped inside provider can access the value
    //value內裝context-state
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}