//*firebase
import {initializeApp} from 'firebase/app';

//*authentication
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

//*database
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'; 




//*Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE11zWoEpbejW7w1g_dMvx0v5PeYJJXfI",
    authDomain: "crwn-clothing-db-8cc7c.firebaseapp.com",
    projectId: "crwn-clothing-db-8cc7c",
    storageBucket: "crwn-clothing-db-8cc7c.appspot.com",
    messagingSenderId: "151278556782",
    appId: "1:151278556782:web:3c8ca71040d74f3d39f87f"
};

//*Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);




//*google登入
//*Instantiate google provider 
const googleProvider = new GoogleAuthProvider();
//force user to select an accout if using google to login
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

//*get authentication from firebase
export const auth = getAuth();

//*set signin popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 




//*Instantiate database
export const db = getFirestore();

//*create user-doc with "uid" from the "google-log-in"
export const createUserDocumentFromAuth = async (
    userAuth, 
    //這裡建立empty object去預備承裝非userAuth傳來的data
    additionalInfo = {} 
    ) => { 

    //若沒有收到userAuth，則代表沒有uid
    //所以就不執行後續code
    if(!userAuth){return;}

    const userDocRef = doc(db, 'users', userAuth.uid);
    //建立doc步驟1
    //1.collection(db)
    //2.document("users")
    //3.data(uid & displayName & email & password)

    //建立doc步驟2
    const userSnapshot = await getDoc(userDocRef);
    //檢查user是否存在
    //若user不存在，則建立user檔案到db
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            //將displayName, email, Date
            //以setDoc method儲存到userDocRef中
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                //在註冊新user時
                //displayName在userAuth內會被預設為null
                //因此才需要user自己填入displayName
                //additionalInfo就是用來承接user自己填寫的displayName
                ...additionalInfo
            })
        }catch(err){
            console.log('error creating user', err.message)
        }
    }
    //若user已經存在，則回傳已經存在的user資料
    return userDocRef;
}




//*email & password註冊(註冊新用戶)
//sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    //若在frontend沒有收到email與password
    //則不執行createUserWithEmailAndPassword
    if(!email || !password){return;}

    return await createUserWithEmailAndPassword(auth, email, password);
}




//*email & password登入
//sign in with email and password
export const signInWithAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password){return;}

    return await signInWithEmailAndPassword(auth, email, password);
}




//*登出功能
export const signUserOut = async () => (await signOut(auth));




//*製作authchange監控(observer)
//此listener將放到UserContext.jsx內
//方便統一在一個compo內獲取user資訊
//如此一來就不用在不同sign-in或sign-up地方
//都設置setCurrentUser了 
export const onAuthStateChangedListener = (callback) => {
    //這是一個perminent open listener
    //listen to auth change
    //因此，這個callback會在每次auth狀態更改
    //意即登入或登出時 
    //執行這個callback function
    onAuthStateChanged(auth, callback)
    //而這個callback function預設會在context內收到user資料
    //(user) => {...}
}