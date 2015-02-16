
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars')
var bodyparser = require('body-parser');

var index = require('./routes/index');
var signIn = require('./routes/sign-in');
var subjects = require('./routes/subjects');
var mynotes = require('./routes/mynotes');
var uploadNotes = require('./routes/upload_notes');
var classes = require('./routes/classes');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars() );
app.set('view engine', 'handlebars');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Add routes here
app.get('/', index.view);
app.get('/sign-in', signIn.view);
app.post('/sign-in/login', signIn.login);
app.get('/sign-in/logout', signIn.logout);
app.get('/mynotes', mynotes.view);
app.get('/upload', uploadNotes.view);
app.post('/upload/notes', uploadNotes.upload);
app.get('/classes', classes.singleClassView);
app.get('/classes/subjects', classes.viewSubjects);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
