const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        min:6,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 1024
    }
}, {collection: 'admins'});

module.exports = mongoose.model('Admin', adminSchema);