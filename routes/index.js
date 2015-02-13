var signIn = require("./sign-in");

exports.view = function(req, res) {
	if( signIn.isLoggedIn() == true ) {
		res.redirect("/mynotes");
	}
	else {
		res.render('index');
	}
};