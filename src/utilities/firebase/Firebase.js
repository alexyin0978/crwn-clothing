import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'; 


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE11zWoEpbejW7w1g_dMvx0v5PeYJJXfI",
    authDomain: "crwn-clothing-db-8cc7c.firebaseapp.com",
    projectId: "crwn-clothing-db-8cc7c",
    storageBucket: "crwn-clothing-db-8cc7c.appspot.com",
    messagingSenderId: "151278556782",
    appId: "1:151278556782:web:3c8ca71040d74f3d39f87f"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


//以下是sign in with google account
//Instantiate google provider 
//-> force user to select an accout if using google to login
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});
//set signin popup
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 


//創建user info database
//Instantiate database
export const db = getFirestore();
//get unipue Id from logGoogleUser's response
export const createUserDocumentFromGoogleAuth = async (
    userAuth, 
    additionalInfo = {}
    ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    //若user不存在，則建立user檔案到db
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            //將displayName, email, createdAt
            //以setDoc method儲存到userDocRef中
            //additionalInfo用來承接signup-form內的displayName
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(err){
            console.log('error creating user', err.message)
        }
    }
    //若存在則單純回傳userDocRef
    return userDocRef;
}


//非google的註冊 -> 直接由email與password註冊
//以下是sign up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password){return;}

    return await createUserWithEmailAndPassword(auth, email, password);
}


//由email與password的登入
//sign in with email and password
export const signInWithAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password){return;}

    return await signInWithEmailAndPassword(auth, email, password);
}