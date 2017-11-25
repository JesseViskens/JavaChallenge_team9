const express = require('express');
const router = express.Router();
const mAuth = require('../middlewares/auth');
var mailer = require('nodemailer');

const Reservatie = require('../models/reservatieModel');
const Gebruiker = require('../models/gebruikerModel');
const Zaal = require('../models/zaalModel');

//get all reservaties
//TODO add mAuth.auth if only user can to this action
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
//TODO add mAuth.auth if only user can to this action
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

async function sendMail(receiver, subject, message) {
    const user = await Gebruiker.findById(receiver);
    console.log(user.email);
    const useremail = user.email;
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'javateamnegen@gmail.com',
            pass: 'javateam9'
        }
    });
    const mailOptions = {
        from: 'no-reply@gmail.com',
        to: useremail,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({yo: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });
}

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
        sendMail(reservatie.gebruiker,'Uw reservatie is toegevoegd', '...Maar moet nog bevestigd worden.');
    });
}

async function checkAvailability(beginuur, einduur, zaal){
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
                    let zaal = await Zaal.findById(docs[i].zaal);
                    if(zaal.zalen.length > 0) {
                        for (let q in zaal.zalen){
                            var available = checkAvailability(beginuur, einduur, zaal.zalen[q]);
                            if (!available) return false;
                        }
                    }
                }
            }
        }
        return true;
    }catch(err){
        console.log("Promise Rejected");
    }
}

//add reservatie
router.post('/', mAuth.auth, async function(req, res, next) {
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

//update reservatie
router.patch('/:id', mAuth.auth, function (req, res, next) {
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

        if (reservatie.bevestigd && !req.user.isAdmin){
            return res.status(401).json({
                title: 'Ongeldige actie',
                error: {message: 'Een bevestigde reservatie kan niet bewerkt worden'}
            });
        }

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
router.delete('/:id', mAuth.authAdmin, function(req, res, next){
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