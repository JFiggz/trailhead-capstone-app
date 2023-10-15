require('dotenv').config();
const axios = require('axios');
const apiRoute = 'https://www.hikingproject.com/data/get-trails';
const key = process.env.HIKE_KEY;

//Trail API with optional filters as defined in the API documentation. Only utilized once a value is set.
module.exports = {
  Query: {
    getTrails: async (
      _root,
      { lat, lon, maxDist, maxResults, minLen, minStars },
      request
    ) => {
      //Primary auth conditional to check if user is logged in before accesing this query
      if (!request.user)
        return 'You must be logged in to access the application.';

      // return await axios.get(`${apiRoute}?lat=${lat}&lon=${lon}${maxDist ? (`&maxDistance=${maxDist}`) : ""}${maxResults ? (`&maxResults=${maxResults}`) : "&maxResults=35"}${minLen ? (`&minLength=${minLen}`) : ""}${minStars ? (`&minStars=${minStars}`) : ""}&key=${key}`)
      //     .then(resp => {
      //         return resp.data.trails;
      //     })
      //     .catch(err => console.log(err));

      return {};
    },
  },
};
