var express = require( 'express' );
var home    = express.Router();
var User    = require( '../models/users' );
var Classes = require( '../models/classes' );

home.get( '/', function( req, res ) {
	User.populate( req.user, { path : 'classes' }, function( err, user ) {
		res.render( 'home', user );
	});
});

module.exports = home;