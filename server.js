var express = require('express')
var app = express()

var cfenv = require("cfenv")

var appEnv = cfenv.getAppEnv()
// start the server on the given port and binding host, and print
// url to server when it starts

app.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url)
});

app.get('/', function(req, res){
  console.log('CALLED')
  res.send('HI');
});
