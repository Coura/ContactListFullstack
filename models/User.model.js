const mongoose =require('mongoose');

const UserSchema = mongoose.Schema({
    name : {
        type:String,
        requires:true
    },

    email : {
        type:String,
        requires:true,
        unique: true
    },

    password : {
        type:String,
        requires:true
    },
    date : {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user', UserSchema)