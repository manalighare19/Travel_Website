const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

//Register
router.post('/register', async (req, res) => {
    //Validate user before creating 
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send({
        status: res.statusCode,
        message: error.details[0].message
    });

    //Checking if email alredy exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send({
        status: res.statusCode,
        message:'Email already exists'
    });

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user =  new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    console.log(user); 
     try{
        const savedUser = await user.save();
        res.send({user: user._id});
     }catch(err){
        res.status(400).send({
            status : res.statusCode,
            message :err
        });
     }
});

//Login
router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    //Validate user before login 
    if(error) return res.status(400).send({
        status : res.statusCode,
        message: error.details[0].message
    });

    //checking if email and password is correct
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send({
        status: res.statusCode,
        message: 'Email do not exist'
    });
    const validatePassword = await bcrypt.compare(req.body.password , user.password); 
    if(!validatePassword) return res.status(400).send({
        status : res.statusCode,
        message : 'Invalid password'
    });

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;