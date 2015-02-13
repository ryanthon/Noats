var signIn = require("./sign-in");


exports.view = function(req, res) {
	console.log( req.body );
	res.render( "index", signIn.getData() );
};