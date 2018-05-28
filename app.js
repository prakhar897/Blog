//All requires
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");

//Misc Commands
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));

//Database Setup
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	time:Date,
	body:String
});

var blog = mongoose.model("blog",blogSchema);

//Optional landing page
app.get("/",function(req,res){
	res.redirect("/home");
});

//INDEX Route
app.get("/home",function(req,res){
	res.render("home",{blog:blog});
});

//NEW Route
app.get("/home/new",function(req,res){
	res.render("new");
});

app.listen(3000,function(req,res){
	console.log("working good");
});