const router = require('express').Router();
const mongoose = require('mongoose');
const Place = require('../model/Place');
const City = require('../model/City');
const Cusine = require('../model/Cusine');

//Get places with city name
router.post('/getplaces', async (req,res) => {
    const places = await Place.find({"city":req.body.city});    
    res.send(places);
});

//Get Food places with city name
router.post('/getfoodPlaces', async (req,res) => {
    const cusines = await Cusine.find({"city":req.body.city});    
    res.send(cusines);
});

//Get city
router.post('/getcity', async (req,res) => {
   
    console.log(req.body.name.toLowerCase());
    
    const cityExist =  await City.findOne({name: req.body.name.toLowerCase()}); 
    if(cityExist) {
        res.send({"cityId" :cityExist._id, "name": cityExist.name});
    } 
    else{
        res.status(400).send({
            message:'City is not available.'
    });  
    }
});


module.exports = router;