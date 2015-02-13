
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var signIn = require('./routes/sign-in');
var classlist = require('./routes/classlist');
var mynotes = require('./routes/mynotes');
var uploadNotes = require('./routes/upload_notes');
var classes = require('./routes/classes');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/sign-in', signIn.view);
app.post('/sign-in/login', signIn.login);
app.get('/classlist', classlist.view);
app.get('/sign-in/logout', signIn.logout);
app.get('/mynotes', mynotes.view);
app.get('/upload', uploadNotes.view);
app.post('/upload/notes', uploadNotes.upload);
app.get('/classes', classes.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
