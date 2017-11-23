var express = require('express');
var router = express.Router();

var GebruikersRole = require('../models/gebruikersRoleModel');

//get all gebruikersRoles
router.get('/', function (req, res, next) {
    GebruikersRole.find().exec(function(err, gebruikersRoles){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: gebruikersRoles
        });
    })
});

//get one gebruikersRole
router.get('/:id', function (req, res, next) {
    GebruikersRole.findById(req.params.id, function(err, gebruikersRole){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: gebruikersRole
        });
    })
});

//add gebruikersRole
GebruikersRole.post('/', function (req, res, next) {
    var gebruikersRole = new GebruikersRole({
        naam: req.body.naam,
    });

    gebruikersRole.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'GebruikersRole is toegevoegd!',
            obj: result
        });
    });
});

//update gebruikersRole
router.patch('/:id', function (req, res, next) {
    GebruikersRole.findById(req.params.id, function(err, gebruikersRole){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!gebruikersRole){
            return res.status(500).json({
                title: 'GebruikersRole niet gevonden',
                error: {message: 'GebruikersRole niet gevonden'}
            });
        }
        gebruikersRole.naam = req.body.naam;
        gebruikersRole.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'GebruikersRole is aangepast!',
                obj: result
            });
        });
    });
});

//delete gebruikersRole
router.delete('/:id', function(req, res, next){
    GebruikersRole.findById(req.params.id, function(err, gebruikersRole){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!gebruikersRole){
            return res.status(500).json({
                title: 'GebruikersRole niet gevonden',
                error: {message: 'GebruikersRole niet gevonden'}
            });
        }
        gebruikersRole.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'GebruikersRole is verwijderd!',
                obj: result
            });
        });
    })
});

module.exports = router;