const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    exportTrailingSlash: true,
    cssLoaderOptions: {
        url: false
    }
});