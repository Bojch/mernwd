const HOST = '192.168.99.100';

const mongodb = {
    PORT: 27017,
    HOST: HOST,
    DB: 'mernd',
};

module.exports = {
    PORT: 4000,
    MONGO_URI: `mongodb://${mongodb.HOST}:${mongodb.PORT}/${mongodb.DB}`,
};
