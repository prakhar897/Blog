//All requires
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");

//Misc Commands
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

//Database Setup
mongoose.connect("mongodb://localhost/blog");
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	time:{type:Date,default:Date.now},
	body:String
});

var blog = mongoose.model("blog",blogSchema);

//Optional landing page
app.get("/",function(req,res){
	res.redirect("/home");
});

//INDEX Route
app.get("/home",function(req,res){
	blog.find({},function(err,blogs){
		if(err)
			console.log(err);
		else
			res.render("home",{blog:blogs});
	});
	
});

//NEW Route
app.get("/home/new",function(req,res){
	res.render("new");
});

//CREATE Route
app.post("/home",function(req,res){
	blog.create(req.body.blog,function(err,newBlog){
		if(err)
			console.log(err);
		else
			res.redirect("/home");
	});
});

app.listen(3000,function(req,res){
	console.log("working good");
});