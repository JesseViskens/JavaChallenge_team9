const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/javachallenge');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var Gebruiker = require('./api/models/gebruikerModel');

app.get('/setup', function (req,res) {
    var admin = new Gebruiker({
        'voornaam': 'Joske',
        'achternaam': 'Vermeulen',
        'password': 'abc123',
        'email': 'joskevermeulen2@gmail.com',
        'adres': 'rdtfyhijop',
        'woonplaats': 'rdtfyguijkpl',
        'isAdmin': true
    });

    admin.save(function (err) {
        if (err) throw err;

        console.log("User Succes");
        res.json({success:true});
    });
});

const zaalRoutes = require('./api/routes/zaalRoutes');
const reservatieRoutes = require('./api/routes/reservatieRoutes');
const materiaalRoutes = require('./api/routes/materiaalRoutes');
const gebruikerRoutes = require('./api/routes/gebruikerRoutes');
const authRoutes = require('./api/routes/authRoutes');

app.use(express.static("public"));

app.use("/zalen", zaalRoutes);
app.use("/reservaties", reservatieRoutes);
app.use("/materialen", materiaalRoutes);
app.use("/gebruikers", gebruikerRoutes);
app.use("/authenticate", authRoutes);

app.listen(port);

console.log('SERVER IS RUNNING: ' + port);