var express = require( 'express' );
var subjects = express.Router();

var auth = require("./auth");
var jsonData = require("../classes.json");

subjects.get( '/', function( req, res ) {
	var data = auth.getData();
	var subjects = jsonData["subjects"];
	data["subjects"] = subjects;
	res.render( "subjects", data );
});

subjects.get( '/:subjectID', function( req, res ) {
	var data = auth.getData();
	var subject = req.params.subjectID;
	var classes = jsonData["available_classes"][subject];
	data["classes"] = classes;
	res.render( "classes", data );
});

module.exports = subjects;