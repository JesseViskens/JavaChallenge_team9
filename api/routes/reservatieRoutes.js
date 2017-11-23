const express = require('express');
const router = express.Router();

const Reservatie = require('../models/reservatieModel');

//get all reservaties
router.get('/', function (req, res, next) {
    Reservatie.find().exec(function(err, reservaties){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: reservaties
        });
    })
});

//get one reservatie
router.get('/:id', function (req, res, next) {
    Reservatie.findById(req.params.id, function(err, reservatie){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: reservatie
        });
    })
});

//add reservatie
router.post('/', function (req, res, next) {
    const reservatie = new Reservatie({
        naam: req.body.naam,
        beginuur: req.body.beginuur,
        einduur: req.body.einduur,
        zaal: req.body.zaal,
        gebruiker: req.body.gebruiker,
        bevestigd: req.body.bevestigd,
        reden: req.body.reden
    });

    reservatie.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Reservatie is toegevoegd!',
            obj: result
        });
    });
});

//update reservatie
router.patch('/:id', function (req, res, next) {
    Reservatie.findById(req.params.id, function(err, reservatie){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!reservatie){
            return res.status(500).json({
                title: 'Reservatie niet gevonden',
                error: {message: 'Reservatie niet gevonden'}
            });
        }
        reservatie.naam = req.body.naam;
        reservatie.beginuur = req.body.beginuur;
        reservatie.einduur = req.body.einduur;
        reservatie.zaal = req.body.zaal;
        reservatie.gebruiker = req.body.gebruiker;
        reservatie.bevestigd = req.body.bevestigd;
        reservatie.reden = req.body.reden;
        reservatie.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Reservatie is aangepast!',
                obj: result
            });
        });
    });
});

//delete reservatie
router.delete('/:id', function(req, res, next){
    Reservatie.findById(req.params.id, function(err, reservatie){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!reservatie){
            return res.status(500).json({
                title: 'Reservatie niet gevonden',
                error: {message: 'Reservatie niet gevonden'}
            });
        }
        reservatie.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Reservatie is verwijderd!',
                obj: result
            });
        });
    })
});

module.exports = router;