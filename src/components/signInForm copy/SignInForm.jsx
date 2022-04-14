import { useState, useContext } from "react";
import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithAuthUserWithEmailAndPassword
 } from "../../utilities/firebase/Firebase";

// import {UserContext} from '../../contexts/UserContext';
import FormInput from "../formInput/FormInput";
import Button, {BUTTON_TYPE_CLASSES} from "../button/Button";

import {
  SignInComponent,
  Header,
  ButtonsContainer
} from './SignInForm.styled';


//*default state狀態object
const defaultFormFields = {
  email: '',
  password: '',
}


const SignInForm = () => {
    
  //*state
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;
  

  //*輸入
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }
  

  //*置入context
  // const {setCurrentUser} = useContext(UserContext);
  //setCurrentUser可以將user資料寫入currentUser內
  //然後此context將被儲存在provider的state內
  /*備註：
  改為由UserContext內的onAuthStateChangeListener
  去得到user資料
  因此在這裡useContext就不需要了 
  */
    

  //*google-sign-in
  const signInWithGoogle = async () => {
    //從database等待資料都會是async function

    //1.
    //google-sign-in之後，會得到resp
    //resp內有user，user內有uid(unique id)
    //uid可以用來建立document instance
    //也就是建立新用戶資料的意思
    const {user} = await signInWithGooglePopup();
    //因此在得到uid後，將uid回傳firebase，以用來建立user檔案
    await createUserDocumentFromAuth(user)

    //2.將google-sign-in的user資料存入context
    // setCurrentUser(user);
    /*備註：
    改為由UserContext內的onAuthStateChangeListener
    去得到user資料
    */
  }


  //*normal-sign-in
  const handleSubmit = async (event) => {
      
    //1.先將表格預設關掉
    event.preventDefault();
    
    //2.登入驗證
    try{
      //a.將登入的email與password傳給firebase做認證
      const {user} = await signInWithAuthUserWithEmailAndPassword(email, password);

      //b.將user資料寫入context
      // setCurrentUser(user);
      /*備註：
      改為由UserContext內的onAuthStateChangeListener
      去得到user資料
      */
      
      //c.將表格淨空 
      resetFormField();
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


  //*登入後將輸入欄位清空
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  }


  return(
    <SignInComponent>
      <Header>Already have an account?</Header>
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
        <ButtonsContainer>
          <Button 
          type="submit">
            Sign In
          </Button>
          <Button 
          //將google-sign-in的button type設為button
          //避免在normal-sign-in時兩個button一起submit
          type='button'
          buttonType={BUTTON_TYPE_CLASSES.google}
          onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInComponent>
  )
}

export default SignInForm;