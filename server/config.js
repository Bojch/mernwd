const config = require('../config.js');

const { HOST, PORT } = config;
const MONGO_PORT = 27017;
const MONGO_DB = 'mernd';

module.exports = {
    PORT: PORT,
    MONGO_URI: `mongodb://${HOST}:${MONGO_PORT}/${MONGO_DB}`,
};
