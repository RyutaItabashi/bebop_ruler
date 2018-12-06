var drone = require('node-bebop');

var bebop = drone.createClient();
var i = 0;

bebop.connect(function() {
	bebop.on('ready', function(){
		bebop.Piloting.flatTrim();
		bebop.on('AttitudeChanged', function(attitude) {
			i = Math.round(attitude.roll * 57.2958);
			if(i == -0) i = 0;
			console.log(i);
		});
	});
});
