const nodemailer = require('nodemailer'),
      express    = require('express'),
      app        = express(),
      ejs        = require('ejs'),
      bodyParser = require('body-parser');

//Set root to /public
app.use(express.static(__dirname + '/public'));

//Handle homepage
app.get('/', (req, res) => {
    res.render('index.ejs');
});

//Start server
const listener = app.listen(3000, '127.0.0.1', function () {
    let port = listener.address().port;
    let host = listener.address().address;
    console.log('\n === Server started on http://' + host + ':' + port + ' ===\n');
});