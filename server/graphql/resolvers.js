const hikingResolvers = require('./resolvers/hikingResolvers');
const userResolvers = require('./resolvers/userResolvers');
const weatherResolvers = require('./resolvers/weatherResolvers');

//Using GraphQL-Tools mergeResolvers function to combine resolvers from three separate files
const { mergeResolvers } = require('@graphql-tools/merge');

const consolResolvers = [hikingResolvers, userResolvers, weatherResolvers];

module.exports = mergeResolvers(consolResolvers);