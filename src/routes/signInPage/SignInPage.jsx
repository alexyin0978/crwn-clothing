import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth
 } from "../../utilities/firebase/Firebase";

const SignInPage = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
        console.log(user)
    }

    return(
        <div>
            this is signin page
            <button onClick={logGoogleUser}
            >connent to google login</button>
        </div>
    )
}

export default SignInPage;