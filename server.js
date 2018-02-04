var express = require('express')
var app = express()
var cors = require('cors');
var bodyParser = require('body-parser');
var cfenv = require("cfenv")
var pg = require('pg')

const conString =process.env.ELEPHANTSQL_URL ||  
var client= new pg.Client(conString);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//enables CORS on all endpoints
app.use(cors());

var appEnv = cfenv.getAppEnv()
// start the server on the given port and binding host, and print
// url to server when it starts

app.listen('6002', '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url)
});

app.get('/', function(req, res){
  console.log('CALLED')
  res.send('HI');
});

app.get('/Login/GetUser', function(req,res){
    client.connect(function(err){
        if(err)
            console.error('could not connect', err);

        client.query("SELECT COUNT(*) from accounts where userid = $1 AND password = $2",
            [req.query.username, req.query.password], function(err, results){
            if(results.rows[0].count == 0)
                res.json({value: false});
            else
                res.json({value: true});
            })
    })
});

app.get('/Home', function(req,res){
    client.connect(function(err){
        if(err)
            console.error('could not connect', err);

        client.query("SELECT * from accounts where userid = $1 AND password = $2",
            [req.query.username, req.query.password], function(err, results){
            if(err)
                console.log(err)
            console.log(results);

                if(results.rows[0].count == 0)
                    res.json({value: false});
                else
                    res.json({value: true});
            })
    })
});

app.get('/Profile', function(req,res){
    console.log(req.query)
    client.connect(function(err){
        if(err)
            return console.error('could not connect', err);

        client.query("SELECT * from accounts where userid = $1 AND password = $2",
            [req.query.username, req.query.password], function(err, results){
                if(results.rows[0].count == 0)
                    res.json({value: false});
                else
                    res.json({value: true});
            })
    })
});

