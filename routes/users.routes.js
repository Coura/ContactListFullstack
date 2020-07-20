const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');
const { check, validationResult } = require('express-validator');

const User =  require('../models/User.model')


//@route POST api/users
//@desc  Register a user
//@access Public
router.post('/',[
    check('name','Please type a name')
    .not()
    .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password', 'Please enter a password with min. 6 Charecters')
    .isLength({ min:6 })
    ],
    async (req,resp)=>{ 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return resp.status(400).json({errors:errors.array()})
        }
    
    /* resp.send('passed'); */

    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({email:email});

        if(user){
            return resp.status(400).json({msg:'User already exists'})
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user:{
                id : user.id,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn:36000
        }, (err,token)=>{
            if(err) throw err;
            resp.json({token});
        })

    } catch (err) {
        console.error(err.message);
        resp.status(500).send('server error')
    }
});

module.exports = router;