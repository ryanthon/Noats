var signIn = require("./auth");

exports.view = function(req, res) {
	res.render('upload_notes', signIn.getData());
};

exports.upload = function(req,res) {
	res.redirect('/mynotes');
}

$(function(){
  
  $(".dropdown-menu li a").click(function(){
    
    $(".btn:first-child").text($(this).text());
     $(".btn:first-child").val($(this).text());
  });

});