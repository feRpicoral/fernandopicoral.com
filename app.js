//Dependencies
const express    = require('express'),
      app        = express(),
      ejs        = require('ejs'),
      bodyParser = require('body-parser');

//Custom modules
const contact    = require('./modules/contact.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set root to /public
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(contact);

//Handle homepage
app.get('/', (req, res, next) => {
    //Show contact feedback if present
    if (req.query.contact) {
        res.render('index', {contact: JSON.parse(decodeURI(req.query.contact))});
    } else {
        res.render('index');
    }
});

//404
app.get('*', (req, res) => {
    res.status(404).render('templates/error', {status:404});
});


//Start server
const listener = app.listen(30000, '127.0.0.1', function () {
    let port = listener.address().port;
    let host = listener.address().address;
    console.log('\n === Server started on http://' + host + ':' + port + ' ===\n');
});