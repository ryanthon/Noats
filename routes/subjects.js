var express = require( 'express' );
var subjects = express.Router();

var Subject = require( '../models/subjects' );
var Classes = require( '../models/classes' );

subjects.get( '/', function( req, res ) {
	Subject.find( {}, function( err, subjs ) {
		var data = {
			'subjects' : subjs
		}
		res.render( 'subjects', data );
	});
});

subjects.get( '/:subjectCode', function( req, res ) {
	Classes.find( { 'code' : req.params.subjectCode }, function( err, classes ) {
		var data = {
			'classes' : classes
		}
		data['subject'] = req.params.subjectCode;
		res.render( "classes", data );
	});
});

module.exports = subjects;