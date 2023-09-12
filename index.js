const express = require("express");
const Category = require("./models/category");
const Task = require("./models/task");

const PORT_NUMBER = 8080;

let app = express();
let categories = [];
let tasks = [];

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
        categories.push(new Category(generateCategoryId(), "To Do"));
        categories.push(new Category(generateCategoryId(), "Doing"));
        categories.push(new Category(generateCategoryId(), "Done"));
    }
    console.log(categories)
    console.log(tasks)
	res.render("index", { categories: categories, tasks: tasks });
});

// Add Category Page
app.get("/add-category", function (req, res) {
    res.render("add-category");
});

app.post("/add-category", function (req, res) {
    let id = generateCategoryId();
    let title = req.body.title;
    categories.push(new Category(id, title));

    res.redirect("/");
});

// Edit Category Page
app.get("/edit-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id);
});

// Delete Category


// Add Task Page
app.get('/add-task', function (req, res) {
    res.render("add-task", { categories: categories });
});

app.post("/add-task", function (req, res) {
    let id = generateTaskId();
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = req.body.dueDate;
    let priority = req.body.priority;
    let categoryId = req.body.categoryId;
    
    tasks.push(new Task(id, title, description, dueDate, priority, categoryId));
    res.redirect("/");
});

// Edit Task Page
app.get("edit-task/:id", function (req, res) {
    let id = req.params.id;
    let task = tasks.find(task => task.id == id);
    res.render("edit-task", {task: task, categories: categories});
});

app.post("/edit-task/", function (req, res) {

});

// Delete Task


// Functions
let categoryIdCounter = 1;
let taskIdCounter = 1;

function generateCategoryId() {
    const categoryId = `C-${categoryIdCounter}`;
    categoryIdCounter++;
    return categoryId;
}

function generateTaskId() {
    const taskId = `T-${taskIdCounter}`;
    taskIdCounter++;
    return taskId;
}