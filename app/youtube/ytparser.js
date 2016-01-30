/*
 * Copied from
 * http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
 */
function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

module.exports = {
    parse: youtube_parser
}