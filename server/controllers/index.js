let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model reference
let User = require('../models/user');

let firstName = "";
let lastName = "";
let phoneNumber = "";
let message = "";
let email = "";

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {
        title: 'Home',
        firstName,
        lastName
    });
    console.log(`\nfirstName: ${firstName}\nlastName: ${lastName}\nemail: ${email}\nphoneNumber: ${phoneNumber}\nmessage: ${message}\n`);
    firstName = "";
};

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About' });
};

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects' });
};

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services' });
};

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact' });
};

module.exports.processContactPage = (req, res, next) => {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    phoneNumber = req.body.phoneNumber;
    message = req.body.message;
    email = req.body.email;
    res.redirect('/');
};

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            contactName: req.user ? req.user.contactName : ""
        });
    }
    else {
        return res.redirect('/');
    }
};
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/business-contacts');
        });
    })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            contactName: req.user ? req.user.contactName : ''
        });
    }
    else {
        return res.redirect('/');
    }
};

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        'username': req.body.username,
        'email': req.body.email,
        'contactName': req.body.contactName,
        'contactNumber': req.body.contactNumber
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log('Error: Inserting New User');
            if (err.name == 'UserExistsError') {
                req.flash('registerMessage',
                    'Registration Error: User Already Exist !');
                console.log('Registration Error: User Already Exist !');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                contactName: req.user ? req.user.contactName : ""
            });
        }
        else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/business-contacts');
            });
        }
    });
};