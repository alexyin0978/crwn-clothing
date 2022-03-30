import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromGoogleAuth
 } from "../../utilities/firebase/Firebase";

import FormInput from "../formInput/FormInput";
import './SignUpForm.scss';
import Button from "../button/Button";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        //因為createAuthUserWithEmailAndPassword是async
	    //而handleSubmit將會用到此function
        //因此handleSubmit也是async

        //刪除form的event預設
        event.preventDefault();

        //check confirmPassword and password matches
        if(password !== confirmPassword){
            alert('Passwords do not match!')
            return;
        }
		
		//create a user document
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            //將displayName裝在{}，作為obj傳到此function內
            await createUserDocumentFromGoogleAuth(user, {displayName})
            //註冊成功後，將欄位清空
            resetFormField();
            
        }catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already been used!')
            }else{
                console.log('user creation failed', err)
            }
        }
    }

    //將欄位清空
    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    return(
        <div className="sign-up-component">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label='Display Name'
                inputObject={{
                    type: "text",
                    required: true,
                    onChange: handleChange,
                    name: "displayName",
                    value: displayName
                }}
                />

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

                <FormInput 
                label='Confirm Password'
                inputObject={{
                    type: "password",
                    required: true,
                    onChange: handleChange,
                    name: "password",
                    value: password
                }}
                />
                <Button type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;