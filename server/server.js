const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const { PORT } = config;

// invoke an instance of express application
const app = express();

// Our DB Configuration
require('./src/db');

// here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization -> [x-access-token]'
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,x-access-token');
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ----------------------------------------------------------
// routings
// ----------------------------------------------------------
const bookRoutes = require('./src/routes/book.router');
app.use('/books', bookRoutes);

app.listen(PORT, function () {
    console.log(`Server is running on Port: ${PORT}`);
});
