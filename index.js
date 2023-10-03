const express = require("express");
const Category = require("./models/category");
const Task = require("./models/task");
const User = require("./models/user");

const PORT_NUMBER = 8080;

let app = express();
let path = require("path");
let categories = [];
let tasks = [];
let users = [];
let categoryIdCounter = 1;
let taskIdCounter = 1;
const CATEGORIES_KEY = "CATEGORIES_KEY";
const TASKS_KEY = "TASKS_KEY";

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

categories.push(
    new Category(generateCategoryId(), "To Do"), 
    new Category(generateCategoryId(), "Doing"), 
    new Category(generateCategoryId(), "Done")
);

users.push(
    new User("admin", "password", "John", "Doe", new Date(1980, 1, 1), "+61 234 567 890", "Wellington Rd, Clayton, VIC 3800", true),
    new User("user", "password", "Jane", "Doe", new Date(1980, 1, 1), "+61 098 765 432", "900 Dandenong Rd, Caulfield East VIC 3145", false)
)

// Login
app.get("/", function (req, res) {
    res.render("login");
})

app.post("/", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let user = users.find(user => user.email == email && user.password == password);

    if (user) {
        if (user.isAdmin) {
            res.redirect("/admin");
        } else {
            res.redirect("/user");
        }
    } else {
        res.send("User not found/password is incorrect");
    }
})

// Admin
// Home Page
app.get("/admin", function (req, res) {    
    let db = [];

    for (i = 0; i < categories.length; i++) {
        let tasksinCategory = tasks.filter(task => task.categoryId == categories[i].id);
        db.push({category: categories[i], tasks: tasksinCategory})
    }

    console.log("categories:\n", categories, "\n\ntasks:\n", tasks, "\n\nusers:\n", users, "\n\ndb:\n", db)

	res.render("admin", { db: db });
});

// Add Category
app.post("/admin/add-category", function (req, res) {
    let id = generateCategoryId();
    let title = req.body.title;

    categories.push(new Category(id, title));

    res.redirect("/admin");
});

// Add Task
app.post("/admin/add-task/:categoryId", function (req, res) {
    let id = generateTaskId();
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = new Date(req.body.dueDate);
    let priority = parseInt(req.body.priority);
    let categoryId = req.params.categoryId;
    
    tasks.push(new Task(id, title, description, dueDate, priority, categoryId));

    res.redirect("/admin");
});

// Edit Category
app.post("/admin/edit-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id);

    category.title = req.body.title;
    
    res.redirect("/admin");
});

// Edit Task
app.post("/admin/edit-task/:id", function (req, res) {
    let id = req.params.id;
    let task = tasks.find(task => task.id == id);

    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = new Date(req.body.dueDate);
    task.priority = parseInt(req.body.priority);
    task.progress = parseFloat(req.body.progress);

    res.redirect("/admin");
});

// Delete Category
app.get("/admin/delete-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id)
    let categoryIndex = categories.indexOf(category);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].categoryId == category.id) {
            tasks.splice(i, 1);
        }
    }

    categories.splice(categoryIndex, 1);

    res.redirect("/admin");
});

// Delete Task
app.get("/admin/delete-task/:id", function (req, res) {
    let id = req.params.id;
    let taskIndex = tasks.indexOf(tasks.find(task => task.id == id))

    tasks.splice(taskIndex, 1);

    res.redirect("/admin");
});

// Add Account
app.get("/admin/add-account", function (req, res) {
    res.render("add-account");
})

app.post("/admin/add-account", function (req, res) {
    
})

// User
// Home Page
app.get("/user", function (req, res) {    
    let db = [];

    for (i = 0; i < categories.length; i++) {
        let tasksinCategory = tasks.filter(task => task.categoryId == categories[i].id);
        db.push({category: categories[i], tasks: tasksinCategory})
    }

    console.log("categories:\n", categories, "\n\ntasks:\n", tasks, "\n\nusers:\n", users, "\n\ndb:\n", db)

	res.render("user", { db: db });
});

// Add Category
app.post("/user/add-category", function (req, res) {
    let id = generateCategoryId();
    let title = req.body.title;

    categories.push(new Category(id, title));

    res.redirect("/user");
});

// Add Task
app.post("/user/add-task/:categoryId", function (req, res) {
    let id = generateTaskId();
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = new Date(req.body.dueDate);
    let priority = parseInt(req.body.priority);
    let categoryId = req.params.categoryId;
    
    tasks.push(new Task(id, title, description, dueDate, priority, categoryId));

    res.redirect("/user");
});

// Edit Category
app.post("/user/edit-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id);

    category.title = req.body.title;
    
    res.redirect("/user");
});

// Edit Task
app.post("/user/edit-task/:id", function (req, res) {
    let id = req.params.id;
    let task = tasks.find(task => task.id == id);

    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = new Date(req.body.dueDate);
    task.priority = parseInt(req.body.priority);
    task.progress = parseFloat(req.body.progress);

    res.redirect("/user");
});

// Delete Category
app.get("/user/delete-category/:id", function (req, res) {
    let id = req.params.id;
    let category = categories.find(category => category.id == id)
    let categoryIndex = categories.indexOf(category);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].categoryId == category.id) {
            tasks.splice(i, 1);
        }
    }

    categories.splice(categoryIndex, 1);

    res.redirect("/user");
});

// Delete Task
app.get("/user/delete-task/:id", function (req, res) {
    let id = req.params.id;
    let taskIndex = tasks.indexOf(tasks.find(task => task.id == id))

    tasks.splice(taskIndex, 1);

    res.redirect("/user");
});

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

/* function checkLocalStorageDataExist(key) {
    if (localStorage.getItem(key)) {
        return true;
    }
    return false;
}

function serialize(key, data) {
    let serealizedArray = JSON.stringify(data);
    localStorage.setItem(key, serealizedArray);
}

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
 
if (checkLocalStorageDataExist(CATEGORIES_KEY)) {
    let serealizedCategories = localStorage.getItem(CATEGORIES_KEY);
    let deserializedCategories = JSON.parse(serealizedCategories);
    categories = deserializedCategories.map(item => new Category(item._id, item._title));
} else {
    categories.push(new Category(generateCategoryId(), "To Do"));
    categories.push(new Category(generateCategoryId(), "Doing"));
    categories.push(new Category(generateCategoryId(), "Done"));
}

if (checkLocalStorageDataExist(TASKS_KEY)) {
    let serealizedTasks = localStorage.getItem(TASKS_KEY);
    let deserializedTasks = JSON.parse(serealizedTasks);
    tasks = deserializedTasks.map(item => new Task(item._id, item._title, item._description, item._dueDate, item._priority, item._progress, item._categoryId));
}

serialize(CATEGORIES_KEY, categories);
serialize(TASKS_KEY, tasks); */