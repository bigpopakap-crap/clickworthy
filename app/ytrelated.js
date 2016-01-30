var request = require('request');

//TODO HIDE THIS KEY (AND REGENERATE)
var API_KEY = 'AIzaSyAiPnD9K0SMc19Yivk9fto9vHX0X5QjzS0';

function relatedVidApiUrl(yid) {
    return 'https://www.googleapis.com/youtube/v3/search'
            + '?part=snippet'
            + '&relatedToVideoId=' + yid
            + '&type=video'
            + '&key=' + API_KEY;
}

/*
 * callback(err, [vids...])
 *
 * vid = {
 *    yid, title, description,
 *    thumb: {
 *      url, width, height
 *    }
 * }
 */
function getRelated(yid, callback) {
    var apiUrl = relatedVidApiUrl(yid);

    request(apiUrl, function(err, resp, body) {
        if (err) {
            callback(err);
            return;
        }

        body = JSON.parse(body);

        var vids = body.items.map(function(item) {
            return {
                yid: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumb: item.snippet.thumbnails.default
            };
        });

        callback(err, vids);
    });
}

module.exports = {
    related: getRelated
}