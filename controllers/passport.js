var GoogleStrategy = require('passport-google-oauth2').Strategy
var User = require('../models/user')

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL = process.env.APP_URI + "/callback/google";

module.exports.controller = function(app, passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({

            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            passReqToCallback: true

        },

        function(request, accessToken, refreshToken, profile, done) {

            process.nextTick(function() {
                User.findOne({
                    'google.id': profile.id
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.username = profile.username;
                        newUser.google.displayName = profile.displayName;
                        newUser.google.email = profile.email;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }

                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
}
