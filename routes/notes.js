var express = require( 'express' );
var notes = express.Router();
var Note = require( '../models/notes' );

notes.get( '/edit/:notesID', function( req, res ) {
	var notesID = req.params.notesID;
	var userID = req.user._id;

	Note.findById( notesID ).populate( 'uploader class' ).exec( function( err, note ) {
		res.render( 'edit_note', note );
	});
});

notes.get( '/:notesID', function( req, res ) {
	var notesID = req.params.notesID;
	var userID = req.user.id;

	Note.findById( notesID ).populate( 'uploader class' ).exec( function( err, note ) {
		if( note.uploader._id.equals( userID ) ) {
			note['isOwn'] = true;
		}

		var isNumber = !isNaN( parseInt( userID.slice( -1 ), 10 ) )
		console.log( isNumber );

		var markedHelpful = note.helpful.indexOf( userID );
		var markedUnhelpful = note.unhelpful.indexOf( userID );

		if( markedHelpful > -1 ) {
			note['markedHelpful'] = true;
		}
		else if( markedUnhelpful > -1 ) {
			note['markedUnhelpful'] = true;
		}

		if( isNumber ) {
			res.render( 'noteviewer', note );
		}
		else {
			res.render( 'noteviewer-a', note );
		}
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
		var alreadyMarkedHelpful = note.helpful.indexOf( userID ) > -1;

		if( alreadyMarkedHelpful ) {
			res.sendStatus( 200 );
			return;
		}

		var unhelpfulMark = note.unhelpful.indexOf( userID );
		var markedUnhelpful = unhelpfulMark > -1;

		if( markedUnhelpful ) {
			note.unhelpful.splice( unhelpfulMark, 1 );
		}

		note.score = note.score + 1;
		note.helpful.push( userID );
		note.save( function() {
			res.sendStatus( 200 );
		});

		// return;

		// if( !alreadyMarkedHelpful ) {
		// 	note.score = note.score + 1;
		// 	note.helpful.push( userID );
		// 	note.save( function() {
		// 		res.sendStatus( 200 );
		// 	});
		// 	return;
		// }

		// var markedUnhelpful = note.unhelpful.indexOf( userID );

		// else {
		// 	res.sendStatus( 200 );
		// }
	});
});

notes.post( '/unhelpful', function( req, res ) {
	var notesID = req.body.notesID;
	var userID = req.user._id;

	Note.findById( notesID ).exec( function( err, note ) {
		var alreadyMarkedUnhelpful = note.unhelpful.indexOf( userID ) > -1;

		if( alreadyMarkedUnhelpful ) {
			res.sendStatus( 200 );
			return;
		}

		note.score = note.score - 1;

		if( note.score < 0 ) {
			note.score = 0;
		}

		var markedHelpful = note.helpful.indexOf( userID );

		if( markedHelpful > -1 ) {
			note.helpful.splice( markedHelpful, 1 );
		}

		note.unhelpful.push( userID );

		note.save( function() {
			res.sendStatus( 200 );
		});
	});
});

module.exports = notes;notes