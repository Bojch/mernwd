const mongoose = require('mongoose');
const config = require('../config');

// mongoose options
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
};

const { mongo } = config;
const URI = `mongodb://${mongo.HOST}:${mongo.PORT}/${mongo.DB}`;

// connect to mongo DB
mongoose.connect(URI, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, `Mongodb Connection Error: ${URI}`));
db.once('open', function () {
    console.log(`Connection path: ${URI}`);
    console.log(`MongoDB database connection established successfully.`);
});
