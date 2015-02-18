var express = require( 'express' );
var upload  = express.Router();
var User    = require( '../models/users' );
var Classes = require( '../models/classes' );
var Note    = require( '../models/notes' );

uploadNote = function( note, req, res ) {
	var classID = req.body.classID;

	note.save( function( err ) {
		if( !err ) {
			Classes.findById( classID, function( err, classData ) {
				classData.notes.push( note.id );
				var index = classData.topics.indexOf( note.topic );

				if( !( index > -1 ) ) {
					classData.topics.push( note.topic );
				}

				classData.save( function( err ) {
					res.sendStatus( 200 );
				});
			});
		}
		else {
			res.sendStatus( 400 );
		}
	});
}

upload.get( '/:classID', function( req, res ) {
	var classID = req.params.classID;
	Classes.findById( classID, function( err, classData ) {
		res.render( 'upload_notes', classData );
	});
});

upload.post( '/text', function( req, res ) {
	var note = new Note({
		'type'     : 'text',
		'title'    : req.body.title,
		'uploader' : req.user._id,
		'score'    : 0,
		'text'     : req.body.text,
		'topic'    : req.body.topic,
		'url'      : ''
	});

	uploadNote( note, req, res );
});

upload.post( '/file', function( req, res ) {
	var note = new Note({
		'type'     : 'file',
		'title'    : req.body.title,
		'uploader' : req.user._id,
		'score'    : 0,
		'text'     : '',
		'topic'    : req.body.topic,
		'url'      : req.body.url
	});

	uploadNote( note, req, res );
});

module.exports = upload;