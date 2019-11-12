const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
},{colletion: 'places'});

module.exports = mongoose.model('Place', placeSchema);