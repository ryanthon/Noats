var express = require( 'express' );
var notes = express.Router();

notes.get( '/:notesID', function( req, res ) {
	res.redirect( '/' );
});

module.exports = notes;notes