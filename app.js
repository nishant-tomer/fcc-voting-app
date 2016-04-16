var express = require("express")
var app = express()
var Mongo = require('mongodb').MongoClient
var env = require("./"+app.get("env"))
var assets = require("path").join(env.cwd,"/client")
var views = require("path").join(assets,"/views")


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
