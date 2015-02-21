var express = require( 'express' );
var classes = express.Router();
var Classes = require( '../models/classes' );
var Note    = require( '../models/notes' );
var User    = require( '../models/users' );

var subjects = require( './subjects' );
classes.use( '/subjects', subjects );

classes.get( '/:classID', function( req, res ) {
	var classID = req.params.classID;

	var topic = req.query.topic;
	var breadcrumb = req.query.breadcrumb;

	var searchParams = {
		path : 'notes'
	}

	if( topic ) {
		searchParams['match'] = {
			'topic' : topic
		}
	}

	Classes.findById( classID ).populate( searchParams ).exec( function( err, classData ) {
		User.populate( classData, { path : 'notes.uploader' }, function( err, classData ) {
			var data = classData;

			if( req.user ) {
				var classes = req.user['classes'];

				if( classes ) {
					data['isAdded'] = classes.indexOf( classID ) > -1;
				}
			}

			if( topic ) {
				data['topic'] = topic;
			}

			if( breadcrumb ) {
				data['breadcrumbs'] = true;
			}

			res.render( 'class', data );
		});
	});
});

classes.post( '/add', function( req, res ) {
	var user = req.user;
	var classes = user.classes;
	var classID = req.body.classID;
	var index = classes.indexOf( classID )
	if( !( index > -1 ) ) {
		classes.push( classID );
	}
	user.save();
	res.sendStatus( 200 );
});

classes.post( '/remove', function( req, res ) {
	var user = req.user;
	var classes = user.classes;
	var classID = req.body.classID;
	var index = classes.indexOf( classID )
	if( index > -1 ) {
		classes.splice( index, 1 );
	}
	user.save();
	res.sendStatus( 200 );
});

module.exports = classes;