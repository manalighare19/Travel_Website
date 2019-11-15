const router = require('express').Router();
const mongoose = require('mongoose');
const Place = require('../model/Place');

//Get places with city name
router.get('/', async (req,res) => {
    const places = await Place.find({"city":req.body.city});    
    res.send(places);
});



module.exports = router;