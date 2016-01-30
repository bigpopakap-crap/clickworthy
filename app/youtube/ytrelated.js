var request = require('request');
var path = require('path');
var ytConverter = require(path.resolve(__dirname + '/ytConverter.js'));

function relatedVidApiUrl(yid) {
    return 'https://www.googleapis.com/youtube/v3/search'
            + '?part=snippet'
            + '&relatedToVideoId=' + yid
            + '&type=video'
            + '&key=' + process.env.YOUTUBE_API_KEY;
}

/*
 * callback(err, [vids...])
 *  where each vid has the format in ytconverter.js
 */
function getRelated(yid, callback) {
    var apiUrl = relatedVidApiUrl(yid);

    request(apiUrl, function(err, resp, body) {
        if (err) {
            callback(err);
            return;
        }

        body = JSON.parse(body);
        var vids = body.items.map(ytConverter.fromRelatedSnippet);
        callback(err, vids);
    });
}

module.exports = {
    related: getRelated
}