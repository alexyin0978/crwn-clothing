import { useState, useContext } from "react";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
 } from "../../utilities/firebase/Firebase";

import FormInput from "../formInput/FormInput";
import Button from "../button/Button";
// import { UserContext } from "../../contexts/UserContext";

import './SignUpForm.scss';


//*default state的狀態obj
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {


    //*state
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    //*輸入
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };


    //*將context導入sign-up-form
    // const {setCurrentUser} = useContext(UserContext);
    //方便將sign-up的user資料存入context
    /*備註：
    改為由UserContext內的onAuthStateChangeListener
    去得到user資料
    因此在這裡useContext就不需要了 
    */


    //*註冊
    const handleSubmit = async (event) => {
        //凡是需要跟db配合的動作都會是async function

        //1.刪除form的event預設
        event.preventDefault();

        //2.check confirmPassword and password matches
        if(password !== confirmPassword){
            alert('Passwords do not match!')
            return;
        }
		
		//3.create a user document
        try{
            //a.將email跟password傳給firebase，並得到user與uid
            //但此user資料的displayName為null，因此見步驟2
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            //b.將user資料存入currentUser的context
            // setCurrentUser(user);
            /*備註：
            改為由UserContext內的onAuthStateChangeListener
            去得到user資料
            因此在這裡useContext就不需要了 
            */

            //c.將displayName裝在{}，作為obj傳到firebase
            await createUserDocumentFromAuth(user, {displayName})

            //d .註冊成功後，將欄位清空
            resetFormField();

        }catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already been used!')
            }else{
                console.log('user creation failed', err)
            }
        }
    }


    //*將欄位清空
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
                    name: "confirmPassword",
                    value: confirmPassword
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