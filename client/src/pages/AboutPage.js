import { Link } from 'react-router-dom';

export default function AboutPage(){
    return(
        <section className="container about">
            <h2 className="about__header">Our Goal</h2>
            <p className="about__text">The trailhead app was developed and designed by an avid hiker. Realizing that often, the time it took to decide on the perfect hike for the time of the day and conditions took way too long.</p>
            <p className="about__text">Trailhead aims to expediate this process by narrowing surrounding hikes based on your preferences for the day and current environmental factors such as weather and air quality.</p>
            <p className="about__text">Remember, every adventure begins at the trailhead!</p>
            <h2 className="about__header">Features</h2>
            <ul className="about__feature-list">
                <li className="about__feature-item">Filter hikes by preferences for day</li>
                <li className="about__feature-item">Provide accurate and up to date weather data</li>
                <li className="about__feature-item">Favourite hikes that you enjoyed</li>
                <li className="about__feature-item">Suggested routes based on prior hikes</li>
                <li className="about__feature-item">Much more!</li>
            </ul>
            <Link to='/signup' className="btn about__signup-btn">Sign Up</Link>
        </section>
    );
};