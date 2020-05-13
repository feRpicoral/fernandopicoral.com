const express    = require('express'),
      app        = express(),
      ejs        = require('ejs'),
      bodyParser = require('body-parser'),
      subdomain  = require('express-subdomain');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const contact = require('./routes/contact.js'),
      index   = require('./routes/index');

//YelpCamp TODO Add this when YelpCamp is finished
//app.use(require('./hosted/YelpCamp/app.js'));

app.use('/contact', contact);
app.use('/', index);

//Start server
const listener = app.listen(30000, '127.0.0.1', function () {
    let port = listener.address().port;
    let host = listener.address().address;
    console.log('\n === Server started on http://' + host + ':' + port + ' ===\n');
});