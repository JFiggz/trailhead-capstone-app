//Validate and refine the location results being recevied from the OpenCage API
function validateLocationResults(data, country) {
    //Array of acceptable types
    const resultTypes = ["city", "road", "county", "village", "building", "railway"];
    let bestMatch;

    //Filter incoming API data for cities only. The API provides other types of locations (buildings, railways, counties etc.)
    let cityFilter = data.results.filter(result => {
        //If country argument is passed to function, then use country for further refinement
        if (country) {
            return result.components["_type"] === "city" && result.components["country_code"] === country ? result : null;
        } else {
            return result.components["_type"] === "city" ? result : null;
        }

    });

    //If a result matching the city type is found, run first part of conditional statement below
    if (cityFilter[0]) {
        //Find the object with a type of city and highest confidence level
        bestMatch = cityFilter.reduce((acc, city) => {
            if (city.components["_type"] === "city") {
                return city.confidence < acc.confidence ? city : acc;
            }
        }, { confidence: 100 });

        //If only one result is returned from Open Cage, return that result
    } else if (data["results"].length === 1) {
        return bestMatch = data.results[0];

        // If multiple results are returned but none are of the city type, filter further based on acceptable types
    } else {
        cityFilter = data.results.filter(result => {
            const acceptedTypeMatch = resultTypes.find(e => e === result.components["_type"]);

            if (acceptedTypeMatch && result.components["country_code"] === country) {
                return result;
            } else {
                return null;
            }
        });

        bestMatch = cityFilter.reduce((acc, city) => {
            return city.confidence < acc.confidence ? city : acc;
        });

    };

    return bestMatch;
};

module.exports = validateLocationResults;