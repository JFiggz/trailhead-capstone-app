import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-white.svg'


export default function LogoutPage() {
    return (
        <section className="container logout">
            <Link to='/' className='nav__logo-link logout__logo-link'><img className='nav__logo logout__logo' src={Logo} alt="Trailhead logo link" /></Link>
            <h1 className="logout__header"><span>Be safe out there!</span>See you soon.</h1>
        </section>
    );
};