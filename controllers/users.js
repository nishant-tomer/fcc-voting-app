var mongoose = require('mongoose')
var user = require('../models/user')

module.exports.controller = function(app,passport) {

          function isLoggedIn(req, res, next) {
            if (req.isAuthenticated()) { return next(); }
            res.redirect('/login');

          app.get('/', function(req, res){
            res.render('index', { user: req.user });
          });

          app.get('/account', isLoggedIn, function(req, res){
            res.render('account', { user: req.user });
          });

          app.get('/login', function(req, res){
            res.render('login', { user: req.user });
          });

          app.get('/auth/google', passport.authenticate('google', { scope: [
                 'https://www.googleapis.com/auth/userinfo.email',
                 'https://www.googleapis.com/auth/userinfo.profile']
          }));
          app.get( '/callback/google',
              	passport.authenticate( 'google', {
              		successRedirect: '/account',
              		failureRedirect: '/login'
          }));

          app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
          });


        	app.route('/api/:id/clicks')
        		.get(isLoggedIn, function(req,res){})
        		.post(isLoggedIn, function(req,res){})
        		.delete(isLoggedIn, function(req,res){});

}
