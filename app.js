const nodemailer = require('nodemailer'),
      express    = require('express'),
      app        = express(),
      ejs        = require('ejs'),
      bodyParser = require('body-parser'),
      contact    = require('./modules/contact.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set root to /public
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use('/contact', contact);

//Handle homepage
app.get('/', (req, res) => {
    res.render('index');
});




//Start server
const listener = app.listen(30000, '127.0.0.1', function () {
    let port = listener.address().port;
    let host = listener.address().address;
    console.log('\n === Server started on http://' + host + ':' + port + ' ===\n');
});