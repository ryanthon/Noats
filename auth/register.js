var LocalStrategy = require( 'passport-local' ).Strategy;
var User          = require( '../models/users' );
var bCrypt        = require( 'bcrypt-nodejs' );

module.exports = function( passport ) {
	passport.use( 'register', new LocalStrategy({
            usernameField : 'email',
            passReqToCallback : true
        },
        function( req, email, password, done ) {
            findOrCreateUser = function() {
                User.findOne({ 
                        'email' : email
                    }, 
                    function( err, user ) {
                        if( err ) {
                            console.log( 'Error in SignUp: ' + err );
                            return done( err );
                        }

                        if( user ) {
                            console.log( 'User already exists with email: ' + email );
                            return done( null, false );
                        } 
                        else {
                            console.log( req.body );
                            var newUser = new User();

                            newUser.email      = email;
                            newUser.password   = createHash( password );
                            newUser.firstName  = req.body.firstName;
                            newUser.lastName   = req.body.lastName;
                            newUser['classes'] = [];

                            newUser.save( function( err ) {
                                if( err ) {
                                    console.log( 'Error in Saving user: ' + err );  
                                    throw err;  
                                }

                                console.log( 'User Registration succesful' );    
                                return done( null, newUser );
                            });
                        }
                });
            };

            process.nextTick( findOrCreateUser );
        })
    );

    // Generates hash using bCrypt
    var createHash = function( password ) {
        return bCrypt.hashSync( password, bCrypt.genSaltSync( 10 ), null );
    }
}