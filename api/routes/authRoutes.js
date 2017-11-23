var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Gebruiker = require('../models/gebruikerModel');

router.post('/', function(req, res) {

    // find the gebruiker
    Gebruiker.findOne({
        email: req.body.email
    }, function(err, gebruiker) {

        if (err) throw err;

        if (!gebruiker) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (gebruiker) {

            // check if password matches
            if (gebruiker.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if gebruiker is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire gebruiker since that has the password
                const payload = {
                    isAdmin: gebruiker.isAdmin
                };
                var token = jwt.sign(payload, 'team9');

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

module.exports = router;