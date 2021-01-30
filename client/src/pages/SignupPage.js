import GoogleLogo from '../assets/icons/google-logo.svg';
import { Input } from '../components/Input';
import Btn from '../components/Btn';
import { Link, useHistory } from 'react-router-dom';
import { SIGNUP_USER } from '../graphql/userQueries';
import { useMutation } from '@apollo/client';
import { addError, removeError } from '../utils/handleValidation';

export default function SignupPage() {

    //GQL mutation to send data to server for user signup
    const [signupUser] = useMutation(SIGNUP_USER);

    const history = useHistory();

    //Handle user event to submit new email/password registration. Includes validation for empty values, password match for confirm password and if user already exists in the DB.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email;
        const pwd = e.target.password;
        const confirmPwd = e.target.passwordConfirm;

        if (pwd.value !== confirmPwd.value) {
            addError(pwd, "confirmPwdValidate");
            addError(confirmPwd, "confirmPwdValidate");
        } else if (email.value.trim() && pwd.value.trim() && confirmPwd.value.trim()) {
            await signupUser({ variables: { email: email.value, pwd: pwd.value } })
                .then(({ data }) => {
                    if (data.signupUser) {
                        history.push('/newuser');
                    } else {
                        addError(email, "userExistsValidate");
                    };
                })
                .catch(err => console.log(err));
        } else {
            if (!email.value.trim()) {
                addError(email, "errorValidate");
            }
            if (!pwd.value.trim()) {
                addError(pwd, "errorValidate");
            }
            if (!confirmPwd.value.trim()) {
                addError(confirmPwd, "errorValidate");
            }
        }
    };


    return (
        <section className="container auth">
            <div className="auth__container">
                <h2 className="auth__header">Sign Up with Google</h2>
                <a className="auth__btn" href="http://localhost:8080/googleAuth"><img className="auth__btn-img" src={GoogleLogo} alt='Google icon' /> SIGN UP WITH GOOGLE</a>
                <p className="auth__header">Or</p>
                <h2 className="auth__header">Sign Up with Email</h2>
                <form className="auth__form" onSubmit={e => handleSubmit(e)}>
                    <label className="auth__label">
                        <Input addClass="auth__input" placeholder='Enter your email' name="email" type="email" handleChange={removeError} errClass={["errorValidate", "userExistsValidate"]} />
                        Email
                    </label>
                    <label className="auth__label">
                        <Input addClass="auth__input" placeholder='Enter a password' name="password" type="password" handleChange={removeError} errClass={["errorValidate", "confirmPwdValidate"]} />
                        Password
                    </label>
                    <label className="auth__label">
                        <Input addClass="auth__input" placeholder='Confirm password' name="passwordConfirm" type="password" handleChange={removeError} errClass={["errorValidate", "confirmPwdValidate"]} />
                        Confirm Password
                    </label>
                    <Btn>Sign Up</Btn>
                </form>
                <span>
                    <p className="auth__login-text">Already registered?</p>
                    <Link to='/login' className="auth__login-link">Sign In Here</Link>
                </span>
            </div>
        </section>
    );
};