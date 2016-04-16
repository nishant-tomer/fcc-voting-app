var express = require("express")
    ,path = require("path")
    ,fs = require("fs")
    ,app = express()
    ,env = require("./config/" + app.get("env"))
    ,assets = path.join(env.cwd,"/assets")
    ,views = path.join(env.cwd,"/views")

var mongoose = require('mongoose')
    ,mongoose.connect('mongodb://localhost/mydb')



app.set("views", views)

app.set("view engine", "jade")
app.use(express.static(assets))
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);


fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

app.use(function(req,res){ res.redirect("/") })


app.listen(process.env.PORT || 3000)
