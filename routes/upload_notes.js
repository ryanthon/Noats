var signIn = require("./sign-in");

exports.view = function(req, res) {
	res.render('upload_notes', signIn.getData());
};

exports.upload = function(req,res) {
	res.redirect('/mynotes');
}