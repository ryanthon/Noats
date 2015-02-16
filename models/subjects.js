var mongoose = require( 'mongoose' );

var subjects = new Schema({
	"title" : String,
	"code"  : String
});

exports.Subject = mongoose.model( 'subjects', subjects );