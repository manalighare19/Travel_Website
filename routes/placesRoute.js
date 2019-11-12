const router = require('express').Router();
const mongoose = require('mongoose');
const Place = require('../model/Place');

router.get('/', async (req,res) => {
    const places = await Place.find({"city":req.body.city});    
    res.send(places);
});



module.exports = router;