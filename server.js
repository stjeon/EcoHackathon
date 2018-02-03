var express = require('express')
var app = express()
var cors = require('cors');
var bodyParser = require('body-parser');
var cfenv = require("cfenv")
var pg = require('pg')

const conString =process.env.ELEPHANTSQL_URL ||  'postgres://szwruwjt:JxoAgI47YW2UgHw1hn5gMLrVsPc7rs_0@elmer.db.elephantsql.com'

var client= new pg.Client(conString);
client.connect(function(err){
    if(err){
        return console.error('coult not connect', err);
    }else {return console.log('SUCCESS')}
})
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

app.get('/home/GetUser', function(req,res){

});

app.post('/register', function (req, res){

});


