var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Gebruiker = require('../models/gebruikerModel');

router.post('/', function (req, res, next) {
    var gebruiker = new Gebruiker({
        voornaam: req.body.voornaam,
        achternaam: req.body.achternaam,
        password: bcrypt.hashSync(req.body.password,10),
        email: req.body.email,
        adres: req.body.adres,
        woonplaats: req.body.woonplaats,
        isAdmin: req.body.isAdmin
    });
    gebruiker.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Gebruiker aangemaakt',
            obj: result
        });
    });
});

router.post('/signin', function (req, res, next) {
    gebruiker.findOne({email: req.body.email}, function(err, gebruiker){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!gebruiker){
            return res.status(401).json({
                title: 'Login mislukt',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, gebruiker.password)){
            return res.status(401).json({
                title: 'Login mislukt',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: gebruiker}, 'secret', {expiresIn:7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            user: gebruiker
        })
    });
});

//get all gebruikers
router.get('/', function (req, res, next) {
    Gebruiker.find().exec(function(err, gebruikers){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: gebruikers
        });
    })
});

module.exports = router;