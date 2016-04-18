var mongoose = require('mongoose')
var user = require('../models/user')
var poll = require('../models/poll')
var option = require('../models/option')


module.exports.controller = function(app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }

    app.get('/', function(req, res) {
        res.render('index', {
            user: req.user
        });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('users/profile', {
            user: req.user
        });
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

    app.get('/callback/google',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/profile/:id/poll', isLoggedIn, function(req, res) {});
    app.post('/profile/:id/poll/:name/option', isLoggedIn, function(req, res) {});
    app.put('/profile/:id/poll/:name', isLoggedIn, function(req, res) {});
    app.put('/profile/:id/option/:name', isLoggedIn, function(req, res) {});
    app.delete('/profile/:id/poll/:name', isLoggedIn, function(req, res) {});
    app.delete('/profile/:id/option/:name', isLoggedIn, function(req, res) {});

}
