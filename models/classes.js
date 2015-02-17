var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var classes = new Schema({
	"title"   : String,
	"section" : String,
	"code"    : String,
	"notes"   : [{
		type  : Schema.ObjectId,
		ref   : "notes"
	}],
	"topics"  : [String]
});

module.exports = mongoose.model( 'classes', classes );