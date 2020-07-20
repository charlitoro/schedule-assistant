"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var authSession_1 = require("./plugins/authSession");
var server = express();
var port = 3000;
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.post('/login', authSession_1.authSession);
server.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
//# sourceMappingURL=server.js.map