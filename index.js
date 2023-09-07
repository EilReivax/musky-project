const express = require("express");
const User = require("./models/user");

const PORT_NUMBER = 8080;

let app = express();
let users = [];

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
	res.render("index");
});

app.get('/view-all-users', function (req, res) {
    res.render("view-all-users", { users: users });
});

app.get("/add-user/:username/", function (req, res) {
    let newUser = new User(req.params.username);
    users.push(newUser);
    res.redirect("/view-all-users");
});

app.get('/delete-user', function (req, res) {
    let id = req.query.id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users.splice(i, 1);
        }
    }
    res.redirect("/view-all-users");
});