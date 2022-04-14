import SignUpForm from "../../components/signUpForm/SignUpForm";
import SignInForm from "../../components/signInForm copy/SignInForm";

import {
    AuthenticationContainer
} from './AuthenticationPage.styled';

const AuthenticationPage = () => {
    return(
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default AuthenticationPage;