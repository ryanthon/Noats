var express = require( 'express' );
var notes = express.Router();
var Note = require( '../models/notes' );

notes.get( '/:notesID', function( req, res ) {
	var notesID = req.params.notesID;
	var userID = req.user._id;

	Note.findById( notesID ).populate( 'uploader class' ).exec( function( err, note ) {
		if( note.uploader._id.equals( userID ) ) {
			note['isOwn'] = true;
		}

		res.render( 'noteviewer', note );
	});
});

notes.post( '/delete/:notesID', function( req, res ) {
	var notesID = req.params.notesID;

	Note.findById( notesID ).populate( 'uploader class' ).exec( function( err, note ) {
		var noteClass = note['class'];
		var classID = noteClass._id;

		note.remove( function( err ) {
			if( !err ) {
				var notes = noteClass.notes;
				var index = notes.indexOf( notesID );
				if( index > -1 ) {
					notes.splice( index, 1 );
				}
			}

			res.send( { 'classID' : classID } );
		});
	});
});

module.exports = notes;notes