var drone = require('node-bebop');
var express = require("express");
var bebop = drone.createClient();
var app = express();

var data = 0;

var server = app.listen(3000, function(){
	console.log("Node.js is listening on port 3000.");
});

app.set('view engine', 'ejs');

app.get("/roll", function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.send('the angle is ' + data);
	console.log('data is ' + data);
});

app.get("/", function(req, res, next) {
	res.render("index", {});
});

bebop.connect(function() {
	bebop.on('ready', function(){
    	bebop.Piloting.flatTrim();
        bebop.on('AttitudeChanged', function(attitude) {
        	data = Math.round(attitude.roll * 57.2958);
            if(data == -0) data = 0;
        });
    });
});

