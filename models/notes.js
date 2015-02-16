var mongoose = require( 'mongoose' );

var notes = new Schema({
	"title"    : String,
	"uploader" : {
		type: Schema.ObjectId
		ref: "users"
	},
	"score"  : Number,
	"url"    : String,
	"topic"  : {
		type : Schema.ObjectId,
		ref  : "topics"
	}
});

exports.Note = mongoose.model( 'notes', notes );