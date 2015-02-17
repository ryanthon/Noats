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

module.exports = classes;