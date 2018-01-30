var express = require('express')
var app = express()
var cors = require('cors');
var bodyParser = require('body-parser');

var cfenv = require("cfenv")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//enables CORS on all endpoints
app.use(cors());

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
