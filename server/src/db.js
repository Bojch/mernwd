const mongoose = require('mongoose');
const config = require('../config');

const { MONGO_URI } = config;

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

// connect to mongo DB
mongoose.connect(MONGO_URI, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, `Mongodb Connection Error: ${MONGO_URI}`));
db.once('open', function () {
    console.log(`Connection path: ${MONGO_URI}`);
    console.log(`MongoDB database connection established successfully.`);
});
