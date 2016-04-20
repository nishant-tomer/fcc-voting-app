var mongoose = require('mongoose')
var User = require('../models/user')
var Poll = require('../models/poll')
var Option = require('../models/option')
var validator = require('validator')


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
    
    app.get("/polls", function(req, res) {
        
        var promise = getPolls()
        promise.then( function(polls){ 
            res.json(JSON.stringify(polls))
        })
    
    })
    
    app.get("/poll/:id", function(req, res) {
        
        var promise = getPoll(req.params.id)
        promise.then( function(poll){ 
            res.json(JSON.stringify(poll))
        })
    
    })
    
    app.get("/option/:optId", function(req, res) {
        
        var result = {ok : ""}
        findVote(req.params.optId).then( castVote, function(err){ result.ok = "failed"; res.json(result) })
                                  .then( function(err){ result.ok = "ok"; res.json(result) },function(err){ result.ok = "failed"; res.json(result) })
    
    })

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

    app.post('/profile/poll', isLoggedIn, function(req, res) {
        var result = savePoll(req);
        res.json({ok : result });
    });
    app.post('/profile/poll/:name/option', isLoggedIn, function(req, res) {});
    app.put('/profile/poll/:name', isLoggedIn, function(req, res) {});
    app.put('/profile/:id/option/:name', isLoggedIn, function(req, res) {});
    app.delete('/profile/:id/poll/:name', isLoggedIn, function(req, res) {});
    app.delete('/profile/:id/option/:name', isLoggedIn, function(req, res) {});

}


function getPoll(id){
    
var poll = Poll.find({_id:id})
               .populate({
                   path : "options",
                   populate: { path : "voters", select: 'displayName' }
                 })
               .exec()
return poll
        
}

function findVote(optId){
    
var promise = Option.findOne({_id:optId}).exec() 
    
return promise
    
}
 
function castVote(option) {
        
        option.count += 1
        var promise =  option.save()
        return promise
                    
    }


function getPolls(){
    
var polls = Poll.find({}).populate('options','count').exec()
return polls
        
}
    




function savePoll(req){

    var uid = req.user.uid

    User.findOne({ uid:uid })
        .exec(function (err, person) {

             if (err) return "failed";

             var poll = new Poll({
                _id:     mongoose.Types.ObjectId(),
                creator: uid,
                name:    req.body.name,
                desc:    req.body.desc
              });

             req.body.options.forEach( function (val,index,array){

                 var option = new Option({
                        _id: mongoose.Types.ObjectId(),
                        name: val,
                        creator: uid,
                        count : 0,
                        belongsTo: req.body.name
                 })
                 poll.options.push(option)
                 option.save(function (err) {
                   if (err) return "failed"

                 });



             })

             poll.save(function (err) {
               if (err) return "failed"
             });

             person.polls.push(poll)

             person.save(function (err){
                if(err) return "failed"


            User.findOne({uid:uid})
                .populate({
                    path: 'polls',
                    populate: { path : 'options'}})
                .exec(function (err, person) {

                    if(err) return "failed"
                    person.polls.forEach( function (poll){
                        poll.options.forEach( function(option){
                            console.log( option.name )});

                        })



                 })
             })
    })
    return "ok"

}
