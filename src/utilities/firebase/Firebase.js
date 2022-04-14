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
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

//*create shop-data-collection & batch into 1 transaction
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    //collectionKey為collection的名稱
    //objectsToAdd為預計要儲存在doc內的shop-data

    //1.建立collection, 指定儲存的database與名稱
    const collectionRef = collection(db, collectionKey);

    //2.建立batch, (可以將所有objects綁進同個transaction)
    const batch = writeBatch(db);

    //3.將objectsToAdd寫進document內
    objectsToAdd.forEach( object => {

        //a.將object資料寫入document內 - 選擇collection, doc名稱
        const docRef = doc(collectionRef, object.title.toLowerCase());

        //b.將object-doc用batch綁定成1個trx
        batch.set(docRef, object);

    });
    
    //4.完成batch的建立 -> 一個doc只需要batch commit一次
    await batch.commit();
    console.log('done');
};

//*get shop-data from collection
export const getCategoriesAndDocuments = async () => {

    //1.指定已經建立的'categories' collection
    //此為arr of shop-data
    const collectionRef = collection(db, 'categories');

    //2.使用query method將arr-data轉為obj-data
    const q = query(collectionRef);

    //3.將某個片段data取出
    const querySnapshot = await getDocs(q);

    //4.將querySnapshot資料儲存到cateGoryMap內
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        //這裡使用reduce, 基底為{}

        //a.將title與items destructure
        const {title, items} = docSnapshot.data();

        //b.???
        acc[title.toLowerCase()] = items;

        //c.將acc回傳
        return acc;

    },{});

    //5.最後，回傳categoryMap
    return categoryMap;

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