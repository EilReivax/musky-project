const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require('express-session')
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");

const Category = require("./routers/category");
const Task = require("./routers/task");
const User = require("./routers/user");
const UserModel = require("./models/user");

const PORT_NUMBER = 8080;

const app = express();

app.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new localStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/FIT2101-3');
}
connect().catch(err => console.log(err));

// User endpoints
app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", User.createOne);

app.get("/", function (req, res) {
    res.render("login", {user: req.user, message: req.flash('error')});
})

app.post("/", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

app.get("/logout", function (req, res) {
    req.logout((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect('/');
    });
});

// Dashboard
app.get("/dashboard", isAuthenticated, Category.getAll);

// Category endpoints
app.post("/add/category", Category.createOne);
app.post("/edit/category/:id", Category.updateOne);
app.get("/delete/category/:id", Category.deleteOne);

// Task endpoints
app.post("/add/task/:id", Task.createOne);
app.post("/edit/task/:id", Task.updateOne);
app.get("/delete/task/:id", Task.deleteOne);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/");
    }
}