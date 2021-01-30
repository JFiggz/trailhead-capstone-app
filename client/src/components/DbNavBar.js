import { Link, useHistory } from 'react-router-dom';
import Logo from '../assets/images/logo-white.svg'
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../graphql/userQueries';

export default function DbNavBar() {

    const history = useHistory();

    const [logoutUser] = useMutation(LOGOUT_USER);


    const logout = () => {
        logoutUser()
            .then(resp => {
                history.push('/logout');
            });
    };

    return (
        <nav className='nav nav--db'>
            <Link to='/' className='nav__logo-link'><img className='nav__logo' src={Logo} alt="Trailhead logo link" /></Link>
            <ul className='nav__list'>
                <li className='nav__list-item'><button type="button" onClick={() => logout()} className='nav__link nav__link--outline nav__link--db'>Sign Out</button></li>
            </ul>
        </nav>
    );
};