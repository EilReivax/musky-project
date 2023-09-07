const express = require("express");
// const Book = require("./models/book");

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
app.get("/", function (request, response) {
	response.render("index");
});

app.get('/view-all', function (req, res) {
    let st = 'ID    Name</br>';
    for (let i = 0; i < db.length; i++) {
        st += db[i].id + ' | ' + db[i].userName + '</br>';
    }
    return st;
});

app.get("/add-user/:userName/", function (req, res) {
    let id = Math.round(Math.random()*1000);
    let userName = req.params.userName;
    let newUser = {id: id, userName: userName};
    users.push(newUser);
    res.redirect("/view-all");
});

app.get('/delete-user', function (req, res) {
    let id = req.query.id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users.splice(i, 1);
        }
    }
    res.redirect("/view-all");
});