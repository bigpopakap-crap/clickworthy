var PAGE_TITLES = [
    'This video will change your life',
    'Someone just won the internet with this video',
    'Watch this and your life will forever change',
    'Everyone needs to stop everything to watch this. Right now.'
];

var PAGE_DESCRIPTIONS = [
    'This is the greatest video ever of all time ever'
];

var RELATED_TITLES = [
    'These might also change your life',
    'More videos as phenomenal as this'
];

function randomElem(arr) {
    return arr.length
            ? arr[Math.floor(Math.random() * arr.length)]
            : '';
}

function randPageTitle() {
    return randomElem(PAGE_TITLES);
}

function randPageDescription() {
    return randomElem(PAGE_DESCRIPTIONS);
}

function randRelatedTitle() {
    return randomElem(RELATED_TITLES);
}

module.exports = {
    pageTitle: randPageTitle,
    pageDesc: randPageDescription,
    relTitle: randRelatedTitle
}