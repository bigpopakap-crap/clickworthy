var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT;

app.use('/public', express.static('public'));

var textgen = require('./textgen.js');
var ytparser = require('./youtube/ytparser.js');
var ytrelated = require('./youtube/ytrelated.js');
var ytTrending = require('./youtube/yttrending.js');

var GLOBALS = require('./globals.js');
app.locals = {
    //only expose config vars one by one, to avoid accidentally leaking them
    MIXPANEL_PROJ_KEY: process.env.MIXPANEL_PROJ_KEY,
    GLOBALS: GLOBALS
};

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// homepage
app.get(GLOBALS.ROUTES.INDEX.URL, function(req, res) {
    ytTrending.trending(function(err, trending) {
        //ignore the error if there is one
        trending = trending || [];

        res.render(GLOBALS.VIEWS.INDEX, {
            initValue: req.query[GLOBALS.ROUTES.INDEX.PARAMS.Y_URL],
            trending: trending
        });
    });
});

//create a page from youtube URL
app.post(GLOBALS.ROUTES.CREATE.URL, function(req, res, next) {
    var youtubeUrl = req.body[GLOBALS.ROUTES.CREATE.PARAMS.Y_URL];

    var yid = youtubeUrl && ytparser.parse(youtubeUrl);
    if (!yid) {
        //TODO handle this error... not a valid youtube video
        res.redirect('/error');
    } else {
        res.redirect(GLOBALS.ROUTES.VIDEO_PAGE.genUrl(yid));
    }
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

// error handler
// TODO put this url in GLOBALS
app.get('/error', function (req, res) {
    //TODO make this better
    //TODO log the error to mixpanel
    //TODO have a link to go back
    res.send('Oh no something went wrong.');
});

// anything else redirects home
app.get('*', function(req, res) {
    res.redirect(GLOBALS.ROUTES.INDEX.URL);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});