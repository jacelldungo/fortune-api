const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyparser = require('body-parser')
const fortuneRoutes = require('./api/routes/fortune')
const authRoutes = require('./api/routes/auth')

app.use(cors())

mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

app.use('/fortune', fortuneRoutes);
app.use('/users', authRoutes);

app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})
module.exports = app;