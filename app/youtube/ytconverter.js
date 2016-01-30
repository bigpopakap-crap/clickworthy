function fromTrendingSnippet(ytSnippet) {
    return validateVideo({
        yid: ytSnippet.id,
        title: ytSnippet.snippet.title,
        description: ytSnippet.snippet.description,
        thumb: ytSnippet.snippet.thumbnails.standard
            /* { url, width, height } */
    });
}

function fromRelatedSnippet(ytSnippet) {
    return validateVideo({
        yid: ytSnippet.id.videoId,
        title: ytSnippet.snippet.title,
        description: ytSnippet.snippet.description,
        thumb: ytSnippet.snippet.thumbnails.medium
            /* { url, width, height } */
    });
}

function validateVideo(video) {
    //TODO actually do some validation here
    return video;
}

module.exports = {
    fromRelatedSnippet: fromRelatedSnippet,
    fromTrendingSnippet: fromTrendingSnippet
}