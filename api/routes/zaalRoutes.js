const express = require('express');
const router = express.Router();
const mAuth = require('../middlewares/auth');

const Zaal = require('../models/zaalModel');

//get all zalen
router.get('/', function (req, res, next) {
    Zaal.find().exec(function(err, zalen){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: zalen
        });
    })
});

//get one zaal
router.get('/:id', function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: zaal
        });
    })
});

//get deelzalen van one zaal
router.get('/:id/deelzalen', function (req, res, next) {
    Zaal.findById(req.params.id).
    populate('zalen').
    exec(function (err, zaal) {
        if (err) return res.status(500).json({message: 'Something went wrong', err: err});
        if (zaal == null) return res.status(500).json({message: 'zaal is null'});
        if (zaal.zalen == null) return res.status(500).json({message: 'Deze zaal heeft geen deelzalen'});
        res.status(201).json({
            message: 'alle deelzalen van zaal ' + zaal.naam,
            obj: zaal.zalen
        });
    });
});

//add zaal
router.post('/', mAuth.authAdmin, function (req, res, next) {
    const zaal = new Zaal(req.body);

    zaal.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Zaal is toegevoegd!',
            obj: result
        });
    });
});
//add deelzaal aan zaal
router.patch('/:id/zaal/:deelzaalId', mAuth.authAdmin, function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        if (zaal.zalen[0] === null) {
            console.log('null');
            zaal.zalen = req.params.deelzaalId;
        } else {
            zaal.zalen.push(req.params.deelzaalId);
        }
        zaal.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is aangepast!',
                obj: result
            });
        });
    });
});

//remove alle deelzalen van zaal
router.patch('/:id/deletedeelzalen', mAuth.authAdmin, function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        zaal.zalen = [];
        zaal.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is aangepast!',
                obj: result
            });
        });
    });
});

//remove één deelzaal van zaal
router.patch('/:id/deletedeelzaal', mAuth.authAdmin, function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        zaal.zalen = [];
        zaal.zalen = req.body.zalen;
        zaal.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is aangepast!',
                obj: result
            });
        });
    });
});

//update zaal
router.patch('/:id', mAuth.authAdmin, function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        zaal.naam = req.body.naam;
        zaal.beschrijving = req.body.beschrijving;
        zaal.oppervlakte = req.body.oppervlakte;
        zaal.foto = req.body.foto;
        zaal.aanvang = req.body.aanvang;
        zaal.sluiting = req.body.sluiting;
        zaal.capaciteit = req.body.capaciteit;
        zaal.zalen = req.body.zalen;
        zaal.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is aangepast!',
                obj: result
            });
        });
    });
});

//delete zaal
router.delete('/:id', mAuth.authAdmin, function(req, res, next){
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        zaal.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is verwijderd!',
                obj: result
            });
        });
    })
});

module.exports = router;