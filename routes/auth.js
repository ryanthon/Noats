var express = require( 'express' );
var auth = express.Router();

var loggedIn = true;

var loggedInItems = [
	{
		"link": "/mynotes",
		"title": "My Notes"
	},
	{
		"link": "/classes/subjects",
		"title": "Classes"
	},
	{
		"link": "/auth/logout",
		"title": "Logout"
	}
]

auth.isLoggedIn = function() {
	return loggedIn;
}

var loggedOutItems = []

var data = {
	"navItems": loggedOutItems
}

function setupData() {
	if( loggedIn == true ) {
		data["navItems"] = loggedInItems;
	}
	else {
		data["navItems"] = loggedOutItems;
	}
}

auth.getData = function() {
	setupData();
	return data;
}

auth.get( '/', function( req, res ) {
	res.render('sign-in', auth.getData());
});

auth.post( '/login', function( req, res ) {
	loggedIn = true;
	res.redirect("/mynotes");
});

auth.get( '/logout', function( req, res ) {
	loggedIn = false;
	res.redirect("/");
});

module.exports = auth;