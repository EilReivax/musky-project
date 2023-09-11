const express = require("express");
const Category = require("./models/category");
const Task = require("./models/task");

const PORT_NUMBER = 8080;

let app = express();
let categories = [];

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("images"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));

app.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

// Home Page
app.get("/", function (req, res) {
    if (categories.length == 0) {
        categories.push(new Category("To Do"));
        categories.push(new Category("Doing"));
        categories.push(new Category("Done"));
    }
	res.render("index", { categories: categories });
});

// Add Category Page
app.get("/add-category", function (req, res) {
    res.render("add-category");
});

app.post("/add-category", function (req, res) {
    let newCategory = new Category(req.body.title);
    categories.push(newCategory);
    res.redirect("/");
});

// Add Task Page
app.get('/add-task', function (req, res) {
    res.render("add-task", { categories: categories });
});

app.post("/add-task", function (req, res) {
    let newTask = new Task(req.body.title, req.body.description, req.body.dueDate, req.body.priority);
    categories[req.body.category].addTask(newTask);
    res.redirect("/");
});