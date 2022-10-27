let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create reference to the User model
let User = require('../models/user');

module.exports.displayContactList = (req, res, next) => {
    User.find((err, userList) => {
        if (err) {
            return console.err(err);
        }
        else {
            res.render('business_contacts/list', { title: 'Business Contacts', UserList: userList.sort() });
        }
    });
};

module.exports.displayContactEditPage = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, userToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('business_contacts/edit', { title: 'Edit Business Contacts', User: userToEdit });
        }
    });
};

module.exports.processContactEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedUser = User({
        '_id': id,
        'username': req.body.username,
        'password': req.body.password,
        'email': req.body.email,
        'contactName': req.body.contactName,
        'contactNumber': req.body.contactNumber
    });

    User.updateOne({ _id: id }, updatedUser, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/business-contacts');
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    User.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/business-contacts');
        }
    });
};