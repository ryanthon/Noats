var express = require( 'express' );
var notes = express.Router();
var Note = require( '../models/notes' );

notes.get( '/:notesID', function( req, res ) {
	var notesID = req.params.notesID;

	Note.findById( notesID ).populate( 'uploader' ).exec( function( err, note ) {
		res.render( 'noteviewer', note );
	});
});

module.exports = notes;notes