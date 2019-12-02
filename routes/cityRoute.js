const router = require('express').Router();
const mongoose = require('mongoose');
const City = require('../model/City');
const Place = require('../model/Place');
const Cusine = require('../model/Cusine');

//Get city
router.get('/', async (req,res) => {
    
    if(req.query.name){
        const cityExist =  await City.findOne({name: req.query.name.toLowerCase()}); 
        if(cityExist) {
            res.send({"cityId" :cityExist._id, "name": cityExist.name});
        } 
        else{
            res.status(400).send({
                message:'City is not available.'
        });  
        }
    }else{
        res.status(400).send({
            message:'Please enter the city name.'
    });  
    }
});

//Get places with city name
router.get('/attractions', async (req,res) => {
    if(req.query.cityId){
        const places = await Place.find({"city":req.query.cityId});    
        res.send(places);
    }else{
        res.status(400).send({
        message:'Please enter the city id.'
    });  
    }
});


//Get Food places with city name
router.get('/food', async (req,res) => {
    if(req.query.cityId){
        const cusines = await Cusine.find({"city":req.query.cityId});    
        res.send(cusines);
    
    }else{
        res.status(400).send({
            message:'Please enter the city id.'
        });  
    }
});



module.exports = router;