const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config=require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const User =  require('../models/User.model')


//@route GET api/auth
//@desc  GET logged in user
//@access Private
router.get('/',auth,async (req,resp)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        resp.json(user);
    } catch (err) {
        console.error(err.message);
        resp.status(500).send('Server Error');
    }
});

//@route POST api/auth
//@desc  Auth user & get token
//@access Public
router.post('/',[
    check('email','Please type your email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req,resp)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({errors:errors.array()})
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            return resp.status(400).json({msg:'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return resp.status(400).json({ msg:'Invalid email or password'})
        }

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

    }catch (err){
        console.error(err.message);
        resp.status(500).send('Server Error');
    }

});

module.exports = router;