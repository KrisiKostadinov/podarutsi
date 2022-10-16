const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares');

require('dotenv').config();
require('colors');

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', require('../routes/home'));
app.use('/users', require('../routes/users'));

// errors handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

require('./db')
    .then(() => {
        if (process.env.NODE_ENV == 'development') {
            console.log(`MongoDB localhost connected` + ` ${process.env.MONGO_db}`.cyan);
            console.log(`${process.env.NODE_ENV}`.yellow);
            console.log(`http://localhost:${PORT}`.cyan);
        }
        app.listen(PORT, () => {
            if (process.env.NODE_ENV == 'development') {
                console.log(`Server listening on port: ${PORT}`.cyan);
            }
        });
    });

module.exports = express();