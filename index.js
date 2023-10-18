const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const Project = require('./routers/project');
const Category = require('./routers/category');
const Task = require('./routers/task');
const User = require('./routers/user');
const UserModel = require('./models/user');

const PORT_NUMBER = 8080;

const app = express();

app.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

// Account endpoints
app.get('/', Project.login)
app.post('/', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

app.get('/register', function (req, res) { 
    res.render('register', { message: req.flash('error') }) 
});
app.post('/register', User.createOne);

app.get('/logout', function (req, res) {
    req.logout((error) => {
        if (error) {
            res.status(400).json({ error: error });
        }
        res.redirect('/');
    });
});

app.get('/delete/user/:id', isAuthenticated, User.deleteOne);

// Dashboard
app.get('/dashboard', isAuthenticated, Project.getAll);
app.post('/edit/project', isAuthenticated, Project.updateOne);

// Category endpoints
app.post('/add/category', isAuthenticated, Category.createOne);
app.post('/edit/category/:id', isAuthenticated, Category.updateOne);
app.get('/delete/category/:id', isAuthenticated, Category.deleteOne);

// Task endpoints
app.post('/add/task/:id', isAuthenticated, Task.createOne);
app.post('/edit/task/:id', isAuthenticated, Task.updateOne);
app.get('/delete/task/:id', isAuthenticated, Task.deleteOne);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}