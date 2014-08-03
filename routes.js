reqt = require('request');
score = require('./models/score')

module.exports = function(app) {

	function random (low, high) {
	    return Math.random() * (high - low) + low;
	}

	var sendJSON = function (err, result, req, res, status) {
		var status = status || 200;
		if (err) {
			res.writeHead(500);
			res.end("DB error" + err);
		} else {
			res.json(status, result);
		}
	}

	app.get('/image/:rand/rand.jpg', function(req,res){
		reqt({
			url: "http://placekitty.artisan.io/" + random(90, 110) + "/" + random(90,110),
			encoding: null // Prevents Request from converting response to string
		}, function(err, response, body) {
			return res.end(body);
		});
	})

	app.route('/score')
		.get(function(req, res){
			score.find().sort({score: -1}).exec(function(err, result){
				sendJSON(err, result, req, res);
			})
		})
		.put(function(req, res){
			score.create(req.body.score, function(err1, result1){
				score.find().sort({score: -1}).exec(function(err, result){
					sendJSON(err, result, req, res);
				})
			})
		})

};