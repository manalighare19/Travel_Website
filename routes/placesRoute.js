const router = require('express').Router();
const mongoose = require('mongoose');
const Place = require('../model/Place');
const City = require('../model/City');

//Get places with city name
router.get('/getplaces', async (req,res) => {
    const places = await Place.find({"city":req.body.city});    
    res.send(places);
});

//Get city
router.get('/getcity', async (req,res) => {
   
    const cityExist =  await City.findOne({name: req.body.name}); 
    if(cityExist) {
        res.send({"cityId" :cityExist._id});
    } 
    else{
        res.status(400).send({
            message:'City is not available.'
    });  
    }
});





module.exports = router;