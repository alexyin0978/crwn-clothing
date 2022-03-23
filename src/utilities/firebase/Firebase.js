import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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


//Instantiate provider 
//-> force user to select an accout if using google to login
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});
//set signin popup
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 


//Instantiate database
export const db = getFirestore();
//get unipue Id from logGoogleUser's response
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    //若user不存在，則建立user檔案到db
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            //將displayName, email, createdAt
            //以setDoc method儲存到userDocRef中
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }catch(err){
            console.log('error creating user', err.message)
        }
    }
    //若存在則單純回傳userDocRef
    return userDocRef;
}
