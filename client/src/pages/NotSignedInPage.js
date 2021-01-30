import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-white.svg'


export default function LogoutPage() {
    return (
        <section className="container user-not-signed">
            <div className="user-not-signed__container">
                <Link to='/' className='nav__logo-link logout__logo-link'><img className='nav__logo logout__logo' src={Logo} alt="Trailhead logo link" /></Link>
                <h1 className="user-not-signed__header">You must be logged in to use the application</h1>
                <Link to='/signup' className="btn home__auth-btn user-not-signed__btn">Sign Up</Link>
                <Link to='/login' className="btn home__auth-btn user-not-signed__btn">Log In</Link>
            </div>
        </section>
    );
};