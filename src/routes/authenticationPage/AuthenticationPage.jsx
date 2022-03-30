import SignUpForm from "../../components/signUpForm/SignUpForm";
import SignInForm from "../../components/signInForm copy/SignInForm";
import './AuthenticationPage.scss';

const AuthenticationPage = () => {
    return(
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default AuthenticationPage;