const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Category = require("./routers/category");
const Task = require("./routers/task");
const User = require("./routers/user");

const PORT_NUMBER = 8080;

const app = express();

app.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

let path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/FIT2101-3');
}
connect().catch(err => console.log(err));

// Endpoints
app.get("/", function (req, res) {
    let error = "";
    res.render("login", { error: error });
})

app.post("/", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let error = "";

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            if (users[i].isAdmin) {
                res.redirect("/admin");
            } else {
                res.redirect("/user");
            }
        } else if (users[i].email == email && users[i].password != password) {
            error = "Password is incorrect!";
            res.render ("login", { error: error });
        }
    }

    error = "Email does not exist!";
    res.render ("login", { error: error });
})


// Category endpoints
app.post("/add/categpry", Category.createOne);
app.post("edit/categpry/:id", Category.updateOne);
app.get("/delete/categpry/:id", Category.deleteOne);

// Task endpoints
app.post("/add/task/:id", Task.createOne);
app.post("/edit/task/:id", Task.updateOne);
app.get("/delete/task/:id", Task.deleteOne);