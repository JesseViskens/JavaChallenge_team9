const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservatieSchema = new Schema({
    naam: {type: String, required: true},
    beginuur: {type: Schema.Types.Date, required: true},
    einduur: {type: Schema.Types.Date, required: true},
    zaal: [{type: Schema.Types.ObjectId, ref: "Zaal"}],
    gebruiker: {type: Schema.Types.ObjectId, ref: "Gebruiker", required: false},
    bevestigd: {type: Boolean, required: true},
    reden: {type: String, required: true}
});

module.exports = mongoose.model('Reservatie', ReservatieSchema);