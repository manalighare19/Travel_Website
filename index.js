const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => console.log('Listening on port 5000'));
