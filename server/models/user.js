let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
//create a user model 
let userModel = mongoose.Schema(
    {
        username: {
            type: String,
            default: "",
            trim: true,
            required: "username is required"
        },
        //password: String,
        email: {
            type: String,
            default: "",
            trim: true,
            required: "Email address is required"
        },
        contactName: {
            type: String,
            default: "",
            trim: true,
            required: "Contact Name is required"
        },
        contactNumber: {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required"
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    });

let options = ({ missingPasswordError: "Wrong / Missing Password" });

userModel.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userModel);