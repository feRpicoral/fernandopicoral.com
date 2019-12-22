const nodemailer = require('nodemailer'),
    app = require('express')(),
    bodyParser = require('body-parser');

app.post('/', function (req, res) {
    console.log(req.body.name);
});

app.listen(63342);