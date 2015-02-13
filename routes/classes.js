var signIn = require("./sign-in");
var jsonData = require("../classes.json");


exports.singleClassView = function(req, res) {
	var query = req.query;

	if( query.class_id != null ) {
		var data = signIn.getData();
		var classID = query.class_id;
		data["notes"] = jsonData["notes"][classID]["documents"];
		data["name"] = jsonData["notes"][classID]["name"];
		res.render( "class", data );
	}
}

exports.viewSubjects = function(req, res) {
	var query = req.query;

	if( query.subject == null ){
		var data = signIn.getData();
		var subjects = jsonData["subjects"];
		data["subjects"] = subjects;
		res.render( "subjects", data );
	}
	else {
		var data = signIn.getData();
		var subject = query.subject;
		var classes = jsonData["available_classes"][subject];
		data["classes"] = classes;
		data["subject"] = subject;
		res.render( "classes", data );
	}
}