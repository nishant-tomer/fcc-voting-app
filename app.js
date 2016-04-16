var express = require("express")
var Mongo = require('mongodb').MongoClient
var path = require("path")

var app = express()

var env = require("./config/" + app.get("env"))
var assets = path.join(env.cwd,"/client")
var views = path.join(assets,"/views")


app.use(express.static(assets))
app.set("views", views)
app.set("view engine", "jade")


// app.get("/", function (req,res){
//
//   res.render("index", {msg: ""})
//
// })
//
// app.use(function(req,res){
//   res.redirect("/")
// })


app.listen(process.env.PORT || 3000)
