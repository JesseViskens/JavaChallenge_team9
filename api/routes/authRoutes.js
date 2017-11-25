const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Gebruiker = require('../models/gebruikerModel');

router.post('/', function(req, res) {

    // find the gebruiker
    Gebruiker.findOne({
        email: req.body.email
    }, function(err, gebruiker) {

        if (err) throw err;

        if (!gebruiker) {
            res.json({ success: false, message: 'Authentication failed' });
        } else if (gebruiker) {

            // check if password matches
            if (gebruiker.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed' });
            } else {

                // if gebruiker is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire gebruiker since that has the password
                const payload = {
                    user: gebruiker
                };
                const token = jwt.sign(payload, 'team9');

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: gebruiker
                });
            }

        }

    });
});

router.post('/signin', function (req, res, next) {
    console.log(req.body);
    Gebruiker.findOne({email: req.body.email}, function(err, gebruiker){
        console.log(gebruiker);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (gebruiker == null){
            return res.status(401).json({
                title: 'Login mislukt',
                error: {message: 'Invalid login credentials'}
            });
        }
        const token = jwt.sign({user: gebruiker}, 'team9', {expiresIn:7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            user: gebruiker
        })
    });
});

module.exports = router;