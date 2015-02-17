var express = require( 'express' );
var classes = express.Router();
var Classes = require( '../models/classes' );

var subjects = require( './subjects' );
classes.use( '/subjects', subjects );

classes.get( '/:classID', function( req, res ) {
	var classID = req.params.classID;

	Classes.findById( classID, function( err, classData ) {
		var data = classData;
		data['isAdded'] = req.user.classes.indexOf( classID ) > -1;
		res.render( 'class', data );
	});
});

classes.post( '/add', function( req, res ) {
	var user = req.user;
	user.classes.push( req.body.classID );
	user.save();
	res.sendStatus( 200 );
});

classes.post( '/remove', function( req, res ) {
	var user = req.user;
	var classes = user.classes;
	var classID = req.body.classID;
	var index = classes.indexOf( classID )
	if( index > -1 ) {
		classes.splice( index, 1 );
	}
	user.save();
	res.sendStatus( 200 );
});

module.exports = classes;