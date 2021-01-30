import ForecastDay from './ForecastDay';

export default function ForecastWeather({ forecast }) {

    const convertDate = (timestamp) => {

        const day = new Date(timestamp * 1000);
        // Check day and return correct shortened version of day name
        switch (day.getDay()) {
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tues";
            case 3:
                return "Wed";
            case 4:
                return "Thurs";
            case 5:
                return "Friday";
            case 6:
                return "Sat";
            default:
                throw new Error("Date incorrectly formatted or does not match mapping.");
        }
    };

    return (
        <section className='forecast'>
            <h2 className="forecast__header">3 Day Forecast</h2>
            {/* Only display the first 3 forecast days including the current */}
            {forecast.slice(0, 3).map((day, i) => {
                return <ForecastDay
                    key={i}
                    day={convertDate(day.dt)}
                    weatherIcon={day.weather[0].icon}
                    weatherDesc={day.weather[0].description}
                    temp={Math.round(day.temp.day)}
                    pop={day.pop}
                    // 0 is used to conditionally render the text on the Forecast Day component 
                    rain={day.rain ? day.rain : 0}
                    snow={day.snow ? day.snow : 0}
                />
            })}
        </section>
    );
};