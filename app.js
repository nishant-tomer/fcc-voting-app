var express = require("express")
    ,fs = require("fs")
    ,bodyParser = require('body-parser')
    ,cookieParser = require('cookie-parser')
    ,session = require('express-session')
    ,RedisStore = require('connect-redis')(session)
    ,passport = require('passport')
    ,app = express()
    ,assets = require("path").join(process.env.cwd(),"/assets")
    ,views = require("path").join(process.env.cwd(),"/views");

require('dotenv').load();

app.set("views", views);
app.set("view engine", "jade");

app.use( session({
	secret: 'fcc-voting-app-secret',
	name:   'nishant-tomer',
	store:  new RedisStore({
		host: '127.0.0.1',
		port: 6379
	}),
	proxy:  true,
  resave: true,
  saveUninitialized: true
}));


app.use(express.static(assets));
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use( cookieParser("FreeCodeCamp"));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
	extended: true
}));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());

var mongoose = require("mongoose");
    mongoose.connect(process.env.DB_URL);

require('./controllers/passport')(passport);

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app,passport);
  }
});

app.use(function(req,res){ res.redirect("/") });


app.listen(process.env.PORT || 8080)
