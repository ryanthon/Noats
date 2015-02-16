var express = require( 'express' );
var classes = express.Router();
var subjects = require( './subjects' );

var auth = require("./auth");
var jsonData = require("../classes.json");

classes.use( '/subjects', subjects );

classes.get( '/:classID', function(req, res) {
	var classID = req.params.classID;

	if( classID != null ) {
		var data = auth.getData();
		data["notes"] = jsonData["notes"][classID]["documents"];
		data["name"] = jsonData["notes"][classID]["name"];
		data["isAdded"] = true;
		res.render( "class", data );
	}
});

module.exports = classes;