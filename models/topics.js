var mongoose = require( 'mongoose' );

var topics = new Schema({
	"name"   : String,
	"class"  : {
		type : Schema.ObjectId,
		ref  : "classes"
	}
});

exports.Topic = mongoose.model( 'topics', topics );