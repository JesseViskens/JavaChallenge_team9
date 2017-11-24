const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZaalSchema = new Schema({
    naam: {type: String, required: true},
    beschrijving: {type: String, required: true},
    oppervlakte: {type: Number, required: true},
    foto: {type: String},
    aanvang: {type: String},
    sluiting: {type: String},
    capaciteit: {type: Number, required: true},
    zalen: [{type: Schema.Types.ObjectId, ref: "Zaal", required: false}]
});

module.exports = mongoose.model('Zaal', ZaalSchema);