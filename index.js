const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 5000;

//Import Routes
const userRoute = require('./routes/userRoute');
const cityRoute = require('./routes/cityRoute');
const loginRoute = require('./routes/loginRoute');
const adminRoute = require('./routes/adminRoute');
dotenv.config();

//Connect to DB
mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to db')
});

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/users', userRoute);
app.use('/api/cities', cityRoute);
app.use('/api/login', loginRoute);
app.use('/admin', adminRoute);


app.listen(port, () => console.log('Listening on port 5000'));
