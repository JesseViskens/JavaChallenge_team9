var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZaalSchema = new Schema({
    naam: {type: String, required: true},
    beschrijving: {type: String, required: true},
    oppervlakte: {type: Number, required: true},
    foto: {type: String},
    aanvang: {type: String},
    sluiting: {type: String},
    capaciteit: {type: Number, required: true}
});

module.exports = mongoose.model('Zaal', ZaalSchema);