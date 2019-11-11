const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();

//Connect to DB
mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connected to db')
});

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000, () => console.log('Listening on port 5000'));
