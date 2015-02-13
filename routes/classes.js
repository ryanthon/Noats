var signIn = require("./sign-in");
var jsonData = require("../classes.json");


exports.view = function(req, res) {
	var data = signIn.getData();
	var classID = req.query.class_id;
	data["notes"] = jsonData["notes"][classID]["documents"];
	data["name"] = jsonData["notes"][classID]["name"];
	res.render( "class", data );
};