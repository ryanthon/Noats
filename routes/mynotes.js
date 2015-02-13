var signIn = require("./sign-in");
var jsonData = require("../classes.json");

function getData() {
	var data = signIn.getData();
	data["classes"] = jsonData["classes"];
	return data;
}

exports.view = function(req, res) {
	res.render('mynotes', getData());
};