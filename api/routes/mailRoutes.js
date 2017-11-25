const express = require('express');
const router = express.Router();
var mailer = require('nodemailer');

function sendMail(receiver, subject, message) {
    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'javateamnegen@gmail.com',
            pass: 'javateam9'
        }
    });
    var mailOptions = {
        from: 'no-reply@gmail.com',
        to: receiver,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({yo: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.json("dit is de index");

    sendMail('quintenscheppermans@gmail.com','Email example', 'Dit is je boodschap');
});

module.exports = router;