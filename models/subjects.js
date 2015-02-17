var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var subjects = new Schema({
	"title" : String,
	"code"  : String
});

module.exports = mongoose.model( 'subjects', subjects );