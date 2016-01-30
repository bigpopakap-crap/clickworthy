var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5364;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get('/', function(req, res) {
    res.render('../views/index.ejs');
});

//create a page from youtube URL
app.post('/makeme/makeme/makeme', function(req, res) {
    var youtubeUrl = req.body.youtubeUrl;

    //TODO do stuff
    var yid = youtubeUrl;

    res.redirect('/clickme/clickme/clickme?yid=' + yid);
});

//display for a given youtube video id
app.get('/clickme/clickme/clickme', function(req, res) {
    var yid = req.query.yid;

    res.render('../views/clickme.ejs', {
        yid: yid
    });
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