const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User =  require('../models/User.model');
const Contact = require('../models/Contact.model');

//@route GET api/contacts
//@desc  Get all users contacts
//@access Private
router.get('/',auth,async (req,resp)=>{
    try{
        const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
        resp.json(contacts);
    } catch (err) {
        console.error(err.message);
        resp.status(500).send('Server Error');
    }
});


//@route POST api/contacts
//@desc  Add new contacts
//@access Private
router.post('/',[auth, [
    check('name','Name is required')
    .not()
    .isEmpty()
]],
    async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resp.status(400).json({errors:errors.array()})
    }

    const { name, email, phone, type} = req.body;

    try{
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contact = await newContact.save();

        res.json(contact);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route PUT api/contacts/:id
//@desc  Update contact
//@access Private
router.put('/:id',auth, async (req,res)=>{
    const { name, email, phone, type} = req.body;


    //build contactc object

    const contactFields = {};

    if(name) contactFields.name =name;
    if(email) contactFields.email=email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;


    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg:'Contact not Found'});

        //Make sure user owns contacts --> usa o token do user actual para verificar se pode alterar
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not authorized'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            {$set : contactFields},
            {new :true});    //se n existe para update cria um novo

            res.json(contact);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/contacts/:id
//@desc  Delete contact
//@access Private
router.delete('/:id',auth, async (req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg:'Contact not Found'});

        //Make sure user owns contacts --> usa o token do user actual para verificar se pode alterar
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not authorized'});
        }

        await Contact.findByIdAndRemove(req.params.id);

            res.json({msg:'Contact Removed'});
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;