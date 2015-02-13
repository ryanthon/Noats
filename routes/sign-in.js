var loggedIn = true;

var loggedInItems = [
	{
		"link": "mynotes",
		"title": "My Notes"
	},
	{
		"link": "classes/subjects",
		"title": "Classes"
	},
	{
		"link": "sign-in/logout",
		"title": "Logout"
	}
]

exports.isLoggedIn = function() {
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

exports.getData = function() {
	setupData();
	return data;
}

exports.view = function(req, res) {
	res.render('sign-in', exports.getData());
};

exports.login = function(req, res) {
	loggedIn = true;
	res.redirect("/mynotes");
}

exports.logout = function(req, res) {
	loggedIn = false;
	res.redirect("/");
}