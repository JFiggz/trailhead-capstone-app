const countryList = require('../data/countryList');

//Validate the country and retrieve country code
async function validateCountryCode(country) {
    return await countryList[country];
}

module.exports = validateCountryCode;
