var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var users = Schema({
	"firstName" : String,
	"lastName"  : String,
	"email"     : String,
	"password"  : String,
	"classes"   : [{
		type  : Schema.ObjectId,
		ref   : "classes"
	}]
});

module.exports = mongoose.model( 'users', users );