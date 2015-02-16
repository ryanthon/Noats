var mongoose = require( 'mongoose' );

var classes = new Schema({
	"title"   : String,
	"section" : Number,
	"subject" : {
		type  : Schema.ObjectId,
		ref   : "subjects"
	},
	"notes"   : [{
		type  : Schema.ObjectId,
		ref   : "notes"
	}],
	"topics"  : [{
		type  : Schema.ObjectId,
		ref   : "topics"
	}]
});

exports.Class = mongoose.model( 'classes', classes );