module.exports = {
    ROUTES : {
        INDEX : '/',
        CREATE : {
            METHOD: 'POST',
            PARAMS: {
                Y_URL: 'yUrl'
            },
            URL: '/create'
        },
        VIDEO_PAGE : {
            PARAMS : {
                Y_ID: 'yid'
            },
            URL: '/CLICKME/CLICKME/CLICKME',
            genUrl: function(yid) {
                return '/CLICKME/CLICKME/CLICKME?yid=' + yid
            }
        }
    },

    VIEWS : {
        INDEX : 'index.ejs',
        VIDEO_PAGE : 'videoPage.ejs'
    }
}