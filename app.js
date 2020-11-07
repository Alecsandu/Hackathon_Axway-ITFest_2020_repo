const express = require("express");
const path = require("path");
const connectDB = require('./config/db')

const app = express();

connectDB()

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/error", function (req, res) {
  res.render("error");
});

app.use(function (req, res) {
  res.status(404).render("error");
});

app.listen(8080);
