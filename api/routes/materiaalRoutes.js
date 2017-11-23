var express = require('express');
var router = express.Router();

var Materiaal = require('../models/materiaalModel');

//get all materialen
router.get('/', function (req, res, next) {
    Materiaal.find().exec(function(err, materialen){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: materialen
        });
    })
});

//get one materiaal
router.get('/:id', function (req, res, next) {
    Materiaal.findById(req.params.id, function(err, materiaal){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: materiaal
        });
    })
});

//add materiaal
router.post('/', function (req, res, next) {
    var materiaal = new Materiaal({
        naam: req.body.naam,
        hoeveelheid: req.body.hoeveelheid
    });

    materiaal.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Materiaal is toegevoegd!',
            obj: result
        });
    });
});

//update materiaal
router.patch('/:id', function (req, res, next) {
    Materiaal.findById(req.params.id, function(err, materiaal){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!materiaal){
            return res.status(500).json({
                title: 'Materiaal niet gevonden',
                error: {message: 'Materiaal niet gevonden'}
            });
        }
        materiaal.naam = req.body.naam;
        materiaal.hoeveelheid = req.body.hoeveelheid;
        materiaal.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Materiaal is aangepast!',
                obj: result
            });
        });
    });
});

//delete materiaal
router.delete('/:id', function(req, res, next){
    Materiaal.findById(req.params.id, function(err, materiaal){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!materiaal){
            return res.status(500).json({
                title: 'Materiaal niet gevonden',
                error: {message: 'Materiaal niet gevonden'}
            });
        }
        materiaal.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Materiaal is verwijderd!',
                obj: result
            });
        });
    })
});

module.exports = router;