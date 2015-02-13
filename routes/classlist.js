var signIn = require("./sign-in");


exports.view = function(req, res) {
	var data = signIn.getData();
	res.render('classlist', data);
};