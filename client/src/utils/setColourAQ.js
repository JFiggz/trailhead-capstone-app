//Helper function to return an indicator colour based on the air quality
export default function setColourAQI(aqi) {
    if (aqi <= 50) {
        return "#00E400";
    } else if (aqi > 50 && aqi <= 100) {
        return "#FFFF00";
    } else if (aqi > 100 && aqi <= 150) {
        return "#FF7E00";
    } else if (aqi > 150 && aqi <= 200) {
        return "#FF0000";
    } else if (aqi > 200 && aqi <= 300) {
        return "#8F3F97";
    } else {
        return "#7E0023";
    }
}