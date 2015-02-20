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

		var markedHelpful = note.helpful.indexOf( userID );
		if( markedHelpful > -1 ) {
			note['markedHelpful'] = true;
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

notes.post( '/helpful', function( req, res ) {
	var notesID = req.body.notesID;
	var userID = req.user._id;

	Note.findById( notesID ).exec( function( err, note ) {
		var alreadyMarked = note.helpful.indexOf( userID );

		if( !( alreadyMarked > -1 ) ) {
			note.score = note.score + 1;
			note.helpful.push( userID );
			note.save( function() {
				res.sendStatus( 200 );
			});
		}
		else {
			res.sendStatus( 200 );
		}
	});
});

notes.post( '/unhelpful', function( req, res ) {
	var notesID = req.body.notesID;
	var userID = req.user._id;

	Note.findById( notesID ).exec( function( err, note ) {
		var marked = note.helpful.indexOf( userID );

		if( marked > -1 ) {
			note.score = note.score - 1;

			if( note.score < 0 ) {
				note.score = 0;
			}

			note.helpful.splice( marked, 1 );
			
			note.save( function() {
				res.sendStatus( 200 );
			});
		}
		else {
			res.sendStatus( 200 );
		}
	});
});

module.exports = notes;notes