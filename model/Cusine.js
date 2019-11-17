const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    cityId:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }

},{colletion: 'cusines'});

module.exports = mongoose.model('Cusine', foodSchema);