const config = require('../config.js');

const { PORT, HOST } = config;

module.exports = {
    SERVER_URI: `http://${HOST}:${PORT}`,
};
