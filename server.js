const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const Zaal = require('./api/models/zaalModel');

mongoose.connect('mongodb://localhost/javachallenge');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const zaalRoutes = require('./api/routes/zaalRoutes');

app.use(express.static("public"));

app.use("/zalen", zaalRoutes);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);