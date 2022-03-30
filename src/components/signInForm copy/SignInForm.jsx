import { useState } from "react";
import { 
    signInWithGooglePopup,
    createUserDocumentFromGoogleAuth,
    signInWithAuthUserWithEmailAndPassword
 } from "../../utilities/firebase/Firebase";

import FormInput from "../formInput/FormInput";
import './SignInForm.scss';
import Button from "../button/Button";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        try{
            const {user} = await signInWithAuthUserWithEmailAndPassword(email, password)
            resetFormField()
        }catch(err){
            switch(err.code){
                case "auth/user-not-found":
                    alert('User email not found!');
                    break
                case "auth/wrong-password":
                    alert('Wrong Password!');
                    break
                default:
                    console.log(err);
            }
        }
    }

    //將欄位清空
    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromGoogleAuth(user)
    }

    return(
        <div className="sign-in-component">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                label='Email'
                inputObject={{
                    type: "email",
                    required: true,
                    onChange: handleChange,
                    name: "email",
                    value: email
                }}
                />

                <FormInput 
                label='Password'
                inputObject={{
                    type: "password",
                    required: true,
                    onChange: handleChange,
                    name: "password",
                    value: password
                }}
                />
                <div className="buttons-container">
                    <Button 
                    type="submit">
                        Sign In
                    </Button>
                    <Button 
                    type='button'
                    buttonType='google' 
                    onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;