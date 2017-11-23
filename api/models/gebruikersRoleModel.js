var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gebruikersRoleSchema = new Schema({
    naam: {type: String, required: true},
});

module.exports = mongoose.model('gebruikersRole', gebruikersRoleSchema);