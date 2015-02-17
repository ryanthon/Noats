var express = require( 'express' );
var upload  = express.Router();
var User    = require( '../models/users' );
var Classes = require( '../models/classes' );

upload.get( '/', function( req, res ) {
	User.populate( req.user, { path : 'classes' }, function( err, user ) {
		res.render( 'upload_notes', user );
	});
});

upload.post( '/text', function( req, res ) {
	console.log( req.body );
	res.redirect( '/' );
});

upload.post( '/file', function( req, res ) {
	console.log( req.body );
	res.redirect( '/' );
});

module.exports = upload;