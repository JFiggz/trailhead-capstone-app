
export default function ForecastDay({ day, weatherIcon, weatherDesc, temp, pop, rain, snow }) {
    return (
        <span className="forecast__item">
            <p className="forecast__text">{day}</p>
            <img className="forecast__icon" src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={`${weatherDesc} icon`} />
            <p className="forecast__desc">{weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</p>
            <p className="forecast__desc">{`POP: ${pop * 100}%`}</p>
            {/* Only display rain/snow mm if it is actually going to rain/snow */}
            {rain ? <p className="forecast__desc">{`Rain: ${Math.round(rain)}mm`}</p> : ""}
            {snow ? <p className="forecast__desc">{`Snow: ${Math.round(snow)}mm`}</p> : ""}
            <p className="forecast__temp">{`${temp}°C`}</p>
        </span>
    );
};