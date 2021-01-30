import setColourAQ from '../utils/setColourAQ';

export default function CurrentWeather({ weatherIcon, weatherDesc, temp, airQuality }) {

    return (
        <section className="curr-weather">
            <h2 className="curr-weather__header">Current Weather</h2>
            <div className="curr-weather__container">
                <span>
                    <img className="curr-weather__icon" src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={`${weatherDesc} icon`} />
                    <p className="curr-weather__text">{weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</p>
                </span>
                <p className="curr-weather__temp">{`${temp}°C`}</p>
                <span>
                    <p className="curr-weather__text  curr-weather__text--aq">Air Quality</p>
                    <p className="curr-weather__aq" style={{ backgroundColor: setColourAQ(airQuality) }}>{airQuality}</p>
                </span>
            </div>
        </section>
    );
};