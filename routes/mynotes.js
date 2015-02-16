var express = require( 'express' );
var mynotes = express.Router();

var auth = require("./auth");
var jsonData = require("../classes.json");

function getData() {
	var data = auth.getData();
	data["classes"] = jsonData["classes"];
	return data;
}

mynotes.get( '/', function(req, res) {
	if( !auth.isLoggedIn() ) {
		res.redirect( '/' );
	}
	else {
		res.render( 'mynotes', getData() );
	}
});

module.exports = mynotes;