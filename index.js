var express = require("express");
var http = require("http");
var app = express();
var fs = require("fs");
var Path = require("path");
var nunjucks = require("nunjucks");
var bodyParser = require('body-parser');
var request = require("request");
var flash = require('express-flash');
var session = require('express-session');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch:true

});

app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }
));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(Path.join(__dirname,"public")));

var baseUrl = "http://localhost:9000/api";

app.get("/homes/home", function(req,res){
    res.render("homes/home.html");
});
app.get("/", function (req, res) {
    res.render("login.html")
});
app.post("/login", function (req, res) {
    request.post(baseUrl+ "/login", {
        json: true,
        body: {
            email: req.body.email,
            password: req.body.password
        }
    },function (err, response ,body){
        if (body.status  == "success"){
            req.session.user = body.body;
            res.redirect("/homes/home")
        }else{
            req.flash("error", body.body);
            res.redirect("back")
        }
    })
});



app.post("/register", function (req, res) {
    request.post(baseUrl+ "/users", {
        json: true,
        body: {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
    },function (err, response ,body){
       if (body.status  == "success"){
           res.redirect("/login")
       }else{
           req.flash("error", body.body)
           res.redirect("back")
       }
    })
});
app.get("/register", function (req, res) {
    res.render("register.html")
});
app.get("/employee/list", function(req,res){
    res.render("employee/list.html");
});

app.get("/employee/create", function(req, res){
    res.render("employee/create.html")
});
app.post("/employee/create", function(req, res){
    request.post(baseUrl+ "/employee", {
        headers:{
            token: req.session.user.token
        },
        json: true,
        body: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            martialstatus: req.body.martialstatus
        }
    },function (err, response ,body){
        if (body.status  == "success"){
            res.redirect("/employee/list")
        }else{
            req.flash("error", body.body)
            res.redirect("back")
        }
    })
});




app.get("/reward/list", function(req,res){
    res.render("reward/list.html");
});

app.get("/reward/create", function(req, res){
    res.render("reward/create.html")
});

app.post("/reward/create", function(req, res){
    request.post(baseUrl+ "/reward", {
        headers:{
            token: req.session.user.token
        },
        json: true,
        body: {
            name: req.body.name,
            bones: parseInt(req.body.bones) ,
            sallery:parseInt(req.body.sallery)
        }
    },function (err, response ,body){
        if (body.status  == "success"){
            res.redirect("/reward/list")
        }else{
            req.flash("error", body.body)
            res.redirect("back")
        }
    })
});




app.get("/activity/list", function(req,res){
    res.render("activity/list.html");
});

app.get("/activity/create", function(req, res){
    res.render("activity/create.html")
});

app.post("/activity/create", function(req, res){
    request.post(baseUrl+ "/activity", {
        headers:{
            token: req.session.user.token
        },
        json: true,
        body: {
            discription: req.body.discription
        }
    },function (err, response ,body){
        if (body.status  == "success"){
            res.redirect("/activity/list")
        }else{
            req.flash("error", body.body)
            res.redirect("back")
        }
    })
});




//app.get("/", function(req,res){
//    res.render("payoff/list.html");
//});

app.get("/payoff/create", function(req, res){
    res.render("payoff/create.html")
});
app.get("/payoff/list", function(req, res){
    res.render("payoff/list.html")
});
app.post("/payoff/create", function(req, res){
    request.post(baseUrl+ "/payoff", {
        headers:{
            token: req.session.user.token
        },
        json: true,
        body: {
            emp_firstName: req.body.emp_firstName,
            monthly_salary: parseInt(req.body.monthly_salary)
        }
    },function (err, response ,body){
        if (body.status  == "success"){
            res.redirect("/payoff/list")
        }else{
            req.flash("error", body.body)
            res.redirect("back")
        }
    })
});



app.use("/", function(req,res, next) {
    if (req.session.user) {
        app.locals.user = req.session.user;
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "accept, cache-control, content-type, x-requested-with, token");
        next();
    }
    else res.redirect("/login")
});




app.get("/config.js", function(req, res){

    var src = "var user = " + JSON.stringify(req.session.user);
    res.send(src);
});

    http.createServer(app).listen(80);