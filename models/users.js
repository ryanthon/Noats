var mongoose = require( 'mongoose' );

var users = new Schema({
	"firstName" : String,
	"lastName"  : String,
	"email"     : String
});

exports.User = mongoose.model( 'users', users );