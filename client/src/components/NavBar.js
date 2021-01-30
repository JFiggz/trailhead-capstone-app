import {NavLink, Link} from 'react-router-dom';
import Logo from '../assets/images/logo-white.svg'

export default function NavBar(){
    return(
        <header>
            <nav className='container nav'>
                <Link to='/' className='nav__logo-link'><img className='nav__logo' src={Logo} alt="Trailhead logo link" /></Link>
                <ul className='nav__list'>
                    <li className='nav__list-item'><NavLink to='/about' className='nav__link'>Learn More</NavLink></li>
                    <li className='nav__list-item'><NavLink to='/login' className='nav__link nav__link--outline'>Sign In</NavLink></li>
                </ul>
            </nav>
        </header>
    )
};