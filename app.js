// require modules
var express     = require( 'express' );
var path        = require( 'path' );
var fs          = require( 'fs' );
var handlebars  = require( 'express-handlebars' )
var bodyparser  = require( 'body-parser' );
var mongoose    = require( 'mongoose' );
var passport    = require( 'passport' );
var session     = require( 'express-session' );

var app = express();

// configure app environment
app.engine( 'handlebars', handlebars() );
app.set( 'port', process.env.PORT || 8000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'handlebars' );
app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
  extended: false
}));
app.use( express.static( path.join( __dirname, 'public' ) ) );

// configure passport
app.use( session({
	secret : 'noats 170 key',
	resave : true,
	saveUninitialized: true
}));
app.use( passport.initialize() );
app.use( passport.session() );

var passportConfig = require( './auth/passport' );
passportConfig( passport );

// connect to mongo database
var mongoLabURI  = 'mongodb://heroku_app33954783:liaue9a9gojmq61d82t6ko0n0m@ds045011.mongolab.com:45011/heroku_app33954783'
var databaseURI = process.env.MONGOLAB_URI || mongoLabURI
mongoose.connect( databaseURI, function( err ) {
	if( err ) {
		console.log( err );
	}
	else {
		console.log( 'connected to mongo database' );
	}
});

// load mongo models
fs.readdirSync( __dirname + '/models' ).forEach( function( fileName ) {
	require( __dirname + '/models/' + fileName );
	console.log( 'loaded model ' + fileName );
});

// required routes
var index     = require( './routes/index' )( passport );
var home      = require( './routes/home' );
var subjects  = require( './routes/subjects' );
var notes     = require( './routes/notes' );
var classes   = require( './routes/classes' );

// register routes
app.use( '/', index );
app.use( '/home', home );
app.use( '/classes', classes );
app.use( '/notes', notes );

// start server
app.listen( app.get( 'port' ), function() {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});