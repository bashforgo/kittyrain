reqt = require('request');
module.exports = function(app) {

	// server routes ===========================================================
	function random (low, high) {
	    return Math.random() * (high - low) + low;
	}


	app.get('/image/:rand/rand.jpg', function(req,res){
		reqt({
			url: "http://placekitty.artisan.io/" + random(90, 110) + "/" + random(90,110),
			encoding: null // Prevents Request from converting response to string
		}, function(err, response, body) {
			return res.end(body);
		});
	})


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};