const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    exportTrailingSlash: true,
    cssLoaderOptions: {
        url: false
    },
    env:{
        API_URL: "https://rybk37gvz3.execute-api.us-east-1.amazonaws.com/prod/api",
        CLIENT_ID: "8c736a60-7cf4-11ea-8bbc-adcb39da8f47",
        AUTH_SERVER: "https//api.charlitoro.com"
    }
});
