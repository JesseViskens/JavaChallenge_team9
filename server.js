const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/javachallenge');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const zaalRoutes = require('./api/routes/zaalRoutes');
const reservatieRoutes = require('./api/routes/reservatieRoutes');
const materiaalRoutes = require('./api/routes/materiaalRoutes');
const gebruikersRoleRoutes = require('./api/routes/gebruikersRoleRoutes');

app.use(express.static("public"));

app.use("/zalen", zaalRoutes);
app.use("/reservaties", reservatieRoutes);
app.use("/materialen", materiaalRoutes);
app.use("/gebruikersRoles", gebruikersRoleRoutes);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);