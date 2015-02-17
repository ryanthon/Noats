var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var notes = new Schema({
	"title"    : String,
	"uploader" : {
		type: Schema.ObjectId,
		ref: "users"
	},
	"score"  : Number,
	"url"    : String,
	"topic"  : String,
	"type"	 : String,
	"text"	 : String
});

module.exports = mongoose.model( 'notes', notes );