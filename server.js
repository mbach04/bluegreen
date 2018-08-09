/**
 * HTTP Server code
 * Created by mike on 15/08/15.
 */

var https = require("https");
var url = require("url");
var fs = require('fs');
var privateKey  = fs.readFileSync('/secret/cert/server.key', 'utf8');
var certificate = fs.readFileSync('/secret/cert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


function start(route, handle) {

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    https.createServer(credentials, onRequest).listen(8443, '0.0.0.0');
}

exports.start = start;
