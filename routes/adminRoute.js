const router = require('express').Router();
const Admin = require('../model/Admin');
const Place = require('../model/Place');
const City = require('../model/City');
const verify = require('../routes/verifyToken');
const jwt = require('jsonwebtoken');
const {adminLoginValidation} = require('../validation');



//Admin Login
router.post('/login', async (req,res) => {
    const { error } = adminLoginValidation(req.body);
    //Validate user before login 
    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });

    //checking if email and password is correct
    const admin = await Admin.findOne({email : req.body.email});
    if(!admin) return res.status(400).send({
        status: res.statusCode,
        message: 'Invalid email'
    });
    const validatePassword = await Admin.findOne({password : req.body.password}); 
    if(!validatePassword) return res.status(400).send({
        status : res.statusCode,
        message : 'Invalid password'
    });

    //create and assign a token
    const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({"token": token});
});

//get attractions
router.get('/attractions', verify, async (req,res) => {
    const admin = await Admin.findById({_id : req.user._id});
    if(admin) {
        console.log("admin");
        Place.aggregate([
            {$group : {
                _id: '$city'
            }}
        ]).then ( async function (result){
            var  attractions = [];
           
            for (let index = 0; index < result.length; index++) {
                const places = await Place.find({city : result[index]._id});  
                
                for(let i=0; i< places.length; i++){
                    attractions.push(places[i]);
                }
                  
            }
            res.send(attractions);
        });  
    }else{
        res.status(400).send({
            message: 'Only admin can access this page.'
       });
    } 
    
});

//edit attractions
router.put('/attractions' ,verify, async function (req, res) {
    const admin = await Admin.findById({_id : req.user._id});
    if(admin){
        await Place.updateOne({_id: Object(req.body._id)}, {$set: req.body});
        res.status(200).send({
            message: 'Update successful.'
       });   
    }else{
        res.status(400).send({
            message: 'Only admin can update this information.'
       });
    }
    
});


module.exports = router;
