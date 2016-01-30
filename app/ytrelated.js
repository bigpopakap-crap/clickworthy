var request = require('request');

function relatedVidApiUrl(yid) {
    return 'https://www.googleapis.com/youtube/v3/search'
            + '?part=snippet'
            + '&relatedToVideoId=' + yid
            + '&type=video'
            + '&key=' + process.env.YOUTUBE_API_KEY;
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