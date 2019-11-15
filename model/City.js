const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    }
},{colletion: 'cities'});

module.exports = mongoose.model('City', citySchema);