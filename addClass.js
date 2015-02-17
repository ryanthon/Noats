var User  = require( './models/users' );
var Class = require( './models/classes' );
var Subject = require( './models/subjects' );
var mongoose = require( 'mongoose' );

// connect to mongo database
var mongoLabURI  = 'mongodb://heroku_app33954783:liaue9a9gojmq61d82t6ko0n0m@ds045011.mongolab.com:45011/heroku_app33954783'
var databaseURI = process.env.MONGOLAB_URI || mongoLabURI
mongoose.connect( databaseURI, function( err ) {
	if( err ) {
		console.log( err );
	}
	else {
		console.log( 'connected to mongo database' );

		var newClass = new Class({
			"title" : "Compiler Construction",
			"section" : "131",
			"code" : "CSE",
			"notes" : [],
			"topics" : [ ]
		});

		newClass.save();
	}
});