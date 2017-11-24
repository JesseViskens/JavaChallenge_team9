const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Gebruiker = require('../models/gebruikerModel');

router.post('/', function (req, res, next) {
    const gebruiker = new Gebruiker({
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