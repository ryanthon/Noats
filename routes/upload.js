var express = require( 'express' );
var upload  = express.Router();
var User    = require( '../models/users' );
var Classes = require( '../models/classes' );
var Note    = require( '../models/notes' );

upload.get( '/:classID', function( req, res ) {
	var classID = req.params.classID;
	Classes.findById( classID, function( err, classData ) {
		res.render( 'upload_notes', classData );
	});
});

upload.post( '/text', function( req, res ) {
	var classID = req.body.classID;

	var note = new Note({
		'type'     : 'text',
		'title'    : req.body.title,
		'uploader' : req.user._id,
		'score'    : 0,
		'text'     : req.body.text,
		'topic'    : req.body.topic,
		'url'      : ''
	});

	note.save( function( err ) {
		if( !err ) {
			Classes.findById( classID, function( err, classData ) {
				if( !classData.notes ) {
					classData.notes = [note.id];
				}
				else {
					classData.notes.push( note.id );
				}

				console.log( classData );

				classData.save( function( err ) {
					res.sendStatus( 200 );
				});
			});
		}
		else {
			res.sendStatus( 400 );
		}
	});
});

upload.post( '/file', function( req, res ) {
	var classID = req.body.classID;
	res.sendStatus( 200 );
});

module.exports = upload;