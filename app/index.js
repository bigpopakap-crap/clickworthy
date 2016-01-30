var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5364;

var ytparser = require('./ytparser.js');
var ytrelated = require('./ytrelated.js');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get('/', function(req, res) {
    res.render('../views/index.ejs');
});

//create a page from youtube URL
app.post('/makeme/makeme/makeme', function(req, res) {
    var youtubeUrl = req.body.youtubeUrl;

    var yid = ytparser.parse(youtubeUrl);
    if (!yid) {
        //TODO handle this error... not a valid youtube video
    }

    res.redirect('/clickme/clickme/clickme?yid=' + yid);
});

//display for a given youtube video id
app.get('/clickme/clickme/clickme', function(req, res) {
    var yid = req.query.yid;

    ytrelated.related(yid, function(err, related) {
        //ignore the error if there is one
        related = related || [];

        res.render('../views/clickme.ejs', {
            yid: yid,
            related: related
        });
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