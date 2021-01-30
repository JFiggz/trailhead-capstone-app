//Helper functions to convert API data to appropriate units. API data is in imperial and dashboard is displayed in metric.

export function convertToKM(miles) {
    return (miles * 1.60934).toFixed(2);
};

export function convertToMile(km) {
    return (km * 0.62137119).toFixed(2);
};

export function convertToMetre(feet) {
    return (feet * 0.3048).toFixed(2);
};

export function convertToFeet(metre) {
    return (metre * 3.2808399).toFixed(2);
};

//Calculate the hiking time based on the dist and elevation as this was not available in the API.
export function calcHikingTime(dist, elevation) {

    const minutes = Math.floor(((((dist / 2) % 1) * 60) + (((elevation / 1000) % 1) * 60)) / 60);
    const hours = Math.floor(dist / 2) + Math.floor(elevation / 1000) + Math.floor((minutes + 60) / 60);

    return ({
        combined: hours + (minutes / 60),
        hrs: hours,
        min: minutes
    });
};