var mongoose = require('mongoose');

//define the order schema
var scoreSchema = mongoose.Schema({
	score: Number
});

//expose it
module.exports = mongoose.model('Score', scoreSchema);
