var express = require("express")
    ,path = require("path")
    ,fs = require("fs")
    ,app = express()
    ,env = require("./config/" + app.get("env"))
    ,assets = path.join(env.cwd,"/assets")
    ,views = path.join(env.cwd,"/views")
    ,passport = require('passport')
    ,session = require('express-session');

require('dotenv').load();
require('./controllers/passport')(passport);

app.set("views", views);
app.set("view engine", "jade");
app.use(session({
	secret: 'fccvotingappsecret',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(assets));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('freecodecamp'));
app.use(express.session());

var mongoose = require("mongoose");
    mongoose.connect(process.env.DB_URL);


fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app,passport);
  }
});

app.use(function(req,res){ res.redirect("/login") });


app.listen(process.env.PORT || 8080)
