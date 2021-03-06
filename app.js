//All requires
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-Sanitizer");

//Misc Commands
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
	req.body.blog.body = req.sanitize(req.body.blog.body);
	blog.create(req.body.blog,function(err,newBlog){
		if(err)
			console.log(err);
		else
			res.redirect("/home");
	});
});

//SHOW Route
app.get("/home/:id",function(req,res){
	blog.findById(req.params.id,function(err,fndBlog){
		if(err)
			console.log(err);
		else
				res.render("show",{blog:fndBlog});
	});
});

//EDIT Route
app.get("/home/:id/edit",function(req,res){
	blog.findById(req.params.id,function(err,editBlog){
		if(err)
			console.log(err);
		else
			res.render("edit",{blog:editBlog});
	});
});

//UPDATE Route
app.put("/home/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err)
			console.log(err);
		else
			res.redirect("/home/" + req.params.id);
	});
});

//Delete Route
app.delete("/home/:id",function(req,res){
	blog.findByIdAndRemove(req.params.id,function(err){
		if(err)
			console.log(err);
		else
			res.redirect("/home");
	});
});

app.listen(3000,function(req,res){
	console.log("Listening to port 3000");
});