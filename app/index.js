var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5364;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get('/', function(req, res) {
	res.status(200).send('Hello world!');
});

// anything else redirects home
app.get('*', function(req, res) {
	res.redirect('/');
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});