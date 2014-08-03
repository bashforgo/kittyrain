// modules =================================================
var express = require('express');
var app     = express();
var mongoose= require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
//var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(process.env.MONGOHQ_URL); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser.json()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app