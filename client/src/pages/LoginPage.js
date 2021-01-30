import GoogleLogo from '../assets/icons/google-logo.svg';
import { Input } from '../components/Input';
import Btn from '../components/Btn';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/userQueries';
import { useMutation } from '@apollo/client';
import { addError, removeError } from '../utils/handleValidation';

export default function LoginPage() {

    //Mutation to handle the user login route
    const [loginUser] = useMutation(LOGIN_USER);

    const history = useHistory();

    //Form event to submit user entered email and password. Validation for if either field is left blank and error handling if no user is found.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email;
        const pwd = e.target.password;

        if (email.value.trim() && pwd.value.trim()) {
            await loginUser({ variables: { email: email.value, pwd: pwd.value } })
                .then(resp => {
                    history.push('/dashboard');
                })
                .catch(err => {
                    addError(email, "noUserValidate");
                    addError(pwd, "noUserValidate");
                });
        } else {
            if (!email.value.trim()) {
                addError(email, "errorValidate");
            }
            if (!pwd.value.trim()) {
                addError(pwd, "errorValidate");
            }
        }


    };


    return (
        <section className="container auth">
            <div className="auth__container">
                <h2 className="auth__header">Sign In with Google</h2>
                <a className="auth__btn" href="http://localhost:8080/googleAuth"><img className="auth__btn-img" src={GoogleLogo} alt='Google icon' /> SIGN IN WITH GOOGLE</a>
                <p className="auth__header">Or</p>
                <h2 className="auth__header">Sign In with Email</h2>
                <form className="auth__form" onSubmit={e => handleSubmit(e)}>
                    <label className="auth__label">
                        <Input addClass="auth__input" placeholder='Enter your email' name="email" type="email" handleChange={removeError} errClass={["errorValidate", "noUserValidate"]} />
                        Email
                    </label>
                    <label className="auth__label">
                        <Input addClass="auth__input" placeholder='Enter a password' name="password" type="password" handleChange={removeError} errClass={["errorValidate", "noUserValidate"]} />
                        Password
                    </label>
                    <Btn>Sign In</Btn>
                </form>
                <span>
                    <p className="auth__login-text">Don’t have an account?</p>
                    <Link to='/signup' className="auth__login-link">Sign Up Here</Link>
                </span>
            </div>
        </section>
    );
};