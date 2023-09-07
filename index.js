const express = require("express");
// const Book = require("./models/book");

const PORT_NUMBER = 8080;

let app = express();

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