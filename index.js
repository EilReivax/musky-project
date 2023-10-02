const express = require("express");
const Category = require("./models/category");
const Task = require("./models/task");

const PORT_NUMBER = 8080;

let app = express();
let path = require("path");
let categories = [];
let tasks = [];
let categoryIdCounter = 1;
let taskIdCounter = 1;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

categories.push(new Category(generateCategoryId(), "To Do"));
categories.push(new Category(generateCategoryId(), "Doing"));
categories.push(new Category(generateCategoryId(), "Done"));

// Home Page
app.get("/", function (req, res) {    
    let db = [];

    for (i = 0; i < categories.length; i++) {
        let tasksinCategory = tasks.filter(task => task.categoryId == categories[i].id);
        db.push({category: categories[i], tasks: tasksinCategory})
    }

    console.log("categories:", categories, "tasks:", tasks, "db:", db)

	res.render("index", { db: db });
});

// Add Category Page
// app.get("/add-category", function (req, res) {
//     res.render("add-category");
// });

app.post("/add-category", function (req, res) {
    let id = generateCategoryId();
    let title = req.body.title;

    categories.push(new Category(id, title));

    res.redirect("/");
});

// Add Task
app.post("/add-task/:categoryId", function (req, res) {
    let id = generateTaskId();
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = new Date(req.body.dueDate);
    let priority = parseInt(req.body.priority);
    let categoryId = req.params.categoryId;
    
    tasks.push(new Task(id, title, description, dueDate, priority, categoryId));

    res.redirect("/");
});

// Edit Category Page
// app.get("/edit-category/:id", function (req, res) {
//     let id = req.params.id;
//     let category = categories.find(category => category.id == id);
//     console.log(category)

//     res.render("edit-category", { category: category });
// });

app.post("/edit-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id);

    category.title = req.body.title;
    
    res.redirect("/");
});

// Edit Task Page
// app.get("/edit-task/:id", function (req, res) {
//     let id = req.params.id;
//     let task = tasks.find(task => task.id == id);

//     res.render("edit-task", {task: task, categories: categories});
// });

app.post("/edit-task/:id", function (req, res) {
    let id = req.params.id;
    let task = tasks.find(task => task.id == id);

    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = new Date(req.body.dueDate);
    task.priority = parseInt(req.body.priority);
    task.categoryId = req.body.categoryId;

    res.redirect("/");
});

// Delete Category
app.get("/delete-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id)
    let categoryIndex = categories.indexOf(category);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].categoryId == category.id) {
            tasks.splice(i, 1);
        }
    }

    categories.splice(categoryIndex, 1);

    res.redirect("/");
});

// Delete Task
app.get("/delete-task/:id", function (req, res) {
    let id = req.params.id;
    let taskIndex = tasks.indexOf(tasks.find(task => task.id == id))

    tasks.splice(taskIndex, 1);

    res.redirect("/");
});

// Login
app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/login", function (req, res) {

})

// 404
app.get("*", function (req, res) {
    res.render("404");
});

// Functions
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