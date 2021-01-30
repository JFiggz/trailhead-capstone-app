const path = require('path');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

//Using GraphQL mergeTypeDefs and loadFileSync to synchronously load all type defs and merge to a single file
const consolTypes = loadFilesSync(path.join(__dirname, '/typeDefs'));

module.exports = mergeTypeDefs(consolTypes);