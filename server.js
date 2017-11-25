const express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://teamnegen:Teamnegen9@ds121716.mlab.com:21716/javachallenge');

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const Gebruiker = require('./api/models/gebruikerModel');

const zaalRoutes = require('./api/routes/zaalRoutes');
const reservatieRoutes = require('./api/routes/reservatieRoutes');
const gebruikerRoutes = require('./api/routes/gebruikerRoutes');
const authRoutes = require('./api/routes/authRoutes');

app.use(express.static("public"));

app.use("/zalen", zaalRoutes);
app.use("/reservaties", reservatieRoutes);
app.use("/gebruikers", gebruikerRoutes);
app.use("/auth", authRoutes);

app.get('/setup', function (req,res) {
    const admin = new Gebruiker({
        'voornaam': 'Joske',
        'achternaam': 'Vermeulen',
        'password': 'abc123',
        'email': 'admin@lguzalen.be',
        'adres': 'rdtfyhijop',
        'woonplaats': 'rdtfyguijkpl',
        'isAdmin': true
    });

    admin.save(function (err) {
        if (err) throw err;

        console.log("Admin Succes");
        res.json({success:true});
    });

    const user = new Gebruiker({
        'voornaam': 'Joske',
        'achternaam': 'Vermeulen',
        'password': 'abc123',
        'email': 'user@lguzalen.be',
        'adres': 'rdtfyhijop',
        'woonplaats': 'rdtfyguijkpl',
        'isAdmin': false
    });

    user.save(function (err) {
        if (err) throw err;

        console.log("User Succes");
        res.json({success:true});
    });
});

app.listen(port);

console.log('SERVER IS RUNNING: ' + port);