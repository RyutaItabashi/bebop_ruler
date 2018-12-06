var drone = require('node-bebop');
var express = require("express");
var bebop = drone.createClient();
var app = express();

var roll = 0, pitch = 0, yaw = 0;

var server = app.listen(3000, function(){
	console.log("Node.js is listening on port 3000.");
});

app.set('view engine', 'ejs');

app.get("/roll", function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.send('the roll is ' + roll);
});


app.get("/pitch", function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.send('the pitch is ' + pitch);
});


app.get("/yaw", function(req, res, next) {
	res.set('Content-Type', 'text/html');
	res.send('the yaw is ' + yaw);
});

app.get("/", function(req, res, next) {
	res.render("index", {});
});

bebop.connect(function() {
	bebop.on('ready', function(){
    	bebop.Piloting.flatTrim();
        bebop.on('AttitudeChanged', function(attitude) {
        	roll = Math.round(attitude.roll * 57.2958);
        	pitch = Math.round(attitude.pitch * 57.2958);
        	yaw = Math.round(attitude.yaw * 57.2958);
            if(roll == -0) roll = 0;
			if(pitch == -0) pitch = 0;
			if(yaw == -0) yaw = 0;
        });
    });
});

