var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    voornaam: {type:String, required: true},
    achternaam: {type:String, required: true},
    password: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    adres: {type:String},
    woonplaats: {type:String},
    isAdmin: {type:Boolean, required:true}
});

module.exports = mongoose.model('Gebruiker', schema);