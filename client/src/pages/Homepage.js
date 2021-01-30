import Logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';


export default function Homepage() {
    return (
        <section className="home">
            <div className="container home__container">
                <img className="home__logo" src={Logo} alt="Trailhead company logo" />
                <span className="home__header-cont" ><h1 className="home__header">Time for Adventure</h1></span>
                <span className="home__text-cont"><p className="home__text">Planning your next hike has never been so easy!</p></span>
                <Link to='/about' className="btn home__learn-btn">Learn More</Link>
                <Link to='/signup' className="btn home__auth-btn">Sign Up</Link>
                <Link to='/login' className="btn home__auth-btn">Log In</Link>
            </div>
        </section>
    );
};