var signIn = require("./sign-in");
var jsonData = require("../classes.json");


exports.viewSubjects = function(req, res) {
	var data = signIn.getData();
	var subjects = jsonData["subjects"];
	data["subjects"] = subjects;
	res.render( "subjects", data );
}

exports.singleSubjectView = function(req, res) {
	var data = signIn.getData();
	var subject = req.params.subject;
	var classes = jsonData["available_classes"][subject];
	data["classes"] = classes;
	res.render( "classes", data );
}