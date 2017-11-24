const express = require('express');
const router = express.Router();

const Reservatie = require('../models/reservatieModel');
const Zaal = require('../models/zaalModel');

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
router.post('/', async function (req, res, next) {
    const reservatie = new Reservatie({
        naam: req.body.naam,
        beginuur: req.body.beginuur,
        einduur: req.body.einduur,
        zaal: req.body.zaal,
        gebruiker: req.body.gebruiker,
        bevestigd: req.body.bevestigd,
        reden: req.body.reden
    });

    //Wait for function that returns boolean if a reservation is possible
    let result = await checkAvailability(reservatie.beginuur, reservatie.einduur, reservatie.zaal);
    if(result) postAvailable(res, reservatie);
    else {
        return res.status(500).json({
            title: 'Zaal niet beschikbaar',
        });
    }
});

//The room is available, make reservation
function postAvailable(res, reservatie) {
    reservatie.save(function (err, result) {
        if (err) {
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
}

async function checkAvailability(beginuur, einduur, zaal) {
    //find all reservations for this room
    try{
        let docs = await Reservatie.find();
        if (docs.length > 0) {
            for (var i = 0; i < docs.length; i++) {
                //check if there's an overlap between the time intervals
                if (new Date(beginuur) <= new Date(docs[i].einduur) && new Date(einduur) >= new Date(docs[i].beginuur)) {
                    //check if it's the same room
                    if (docs[i].zaal.equals(zaal)) {
                        return false;
                    }
                    //check recursive if part of the room is already reserved
                    Zaal.findById(docs[i].zaal, function(err, zaal) {
                        if(zaal.zalen.length > 0) {
                            zaal.zalen.forEach(function (deelZaalId) {
                                var available = checkAvailability(beginuur, einduur, deelZaalId);
                                if (!available) return false;
                            });
                        }
                    });
                }
            }
        }
        return true;
    }catch(err){
         console.log("Promise Rejected");
    }
}

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