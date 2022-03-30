import { 
    signInWithGooglePopup,
    createUserDocumentFromGoogleAuth,
    // signInWithGoogleRedirect,
    // auth
 } from "../../utilities/firebase/Firebase";
//  import {useEffect} from 'react';
//  import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/signUpForm/SignUpForm";

const SignInPage = () => {

    // useEffect(async () => {
    //     //因為redirect會開啟新分頁，資料會無法跑到原有頁面
    //     //因此要用getRedirectResult把資料導過來
    //     //之後所以要call useEffect而非signInWithGoogleRedirect
    //     //是因為signInWithGoogleRedirect會直接讓頁面reMount
    //     //然後會trigger useEffect for once
    //     //(dep is [], so useEffect only triggers once)
    //     const response = await getRedirectResult(auth);
    //     console.log(response)
    //     //make sure response is not null
    //     if(response){
    //         const userDocRef = await createUserDocumentFromGoogleAuth(response.user)
    //     }
    // },[])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromGoogleAuth(user)
    }

    return(
        <div>
            this is signin page
            <button onClick={logGoogleUser}
            >connent to google login</button>
            {/* <button onClick={signInWithGoogleRedirect}
            >redirect to google login</button> */}
            <SignUpForm />
        </div>
    )
}

export default SignInPage;