"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var authSession_1 = require("./plugins/authSession");
var server = express();
var port = 5000;
var options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://next.charli.com',
    preflightContinue: false
};
server.use(cors(options));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.post('/login', authSession_1.authSession);
server.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
//# sourceMappingURL=server.js.map