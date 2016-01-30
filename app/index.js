var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5364;

var textgen = require('./textgen.js');
var ytparser = require('./ytparser.js');
var ytrelated = require('./ytrelated.js');

var GLOBALS = require('./globals.js');
app.locals = {
    GLOBALS: GLOBALS
};

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get(GLOBALS.ROUTES.INDEX, function(req, res) {
    res.render(GLOBALS.VIEWS.INDEX);
});

//create a page from youtube URL
app.post(GLOBALS.ROUTES.CREATE.URL, function(req, res) {
    var youtubeUrl = req.body[GLOBALS.ROUTES.CREATE.PARAMS.Y_URL];

    var yid = youtubeUrl && ytparser.parse(youtubeUrl);
    if (!yid) {
        //TODO handle this error... not a valid youtube video
    }

    res.redirect(GLOBALS.ROUTES.VIDEO_PAGE.genUrl(yid));
});

//display for a given youtube video id
app.get(GLOBALS.ROUTES.VIDEO_PAGE.URL, function(req, res) {
    var yid = req.query[GLOBALS.ROUTES.VIDEO_PAGE.PARAMS.Y_ID];

    ytrelated.related(yid, function(err, related) {
        //ignore the error if there is one
        related = related || [];

        res.render(GLOBALS.VIEWS.VIDEO_PAGE, {
            yid: yid,
            siteOrigin: req.headers.host,
            pageTitle: textgen.pageTitle(),
            pageDesc: textgen.pageDesc(),
            relTitle: textgen.relTitle(),
            related: related
        });
    });
});

// anything else redirects home
app.get('*', function(req, res) {
    res.redirect(GLOBALS.ROUTES.INDEX);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});