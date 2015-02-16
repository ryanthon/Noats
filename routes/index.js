var express = require( 'express' );
var index = express.Router();

var signIn = require("./auth");

index.get( '/', function( req, res ) {
	if( signIn.isLoggedIn() == true ) {
		res.redirect("/mynotes");
	}
	else {
		res.render('index');
	}
});

// exports.view = function(req, res) {
// 	if( signIn.isLoggedIn() == true ) {
// 		res.redirect("/mynotes");
// 	}
// 	else {
// 		res.render('index');
// 	}
// };

module.exports = index;