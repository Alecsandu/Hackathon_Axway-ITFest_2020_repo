const express = require("express");
const path = require("path");
const session = require('express-session')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const fs = require('fs')
const formidable = require('formidable');
const connectDB = require('./config/db')

const app = express();

connectDB()

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret: 'noroc', saveUninitialized: false,resave:true}))

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.use(function (req, res) {
  res.status(404).render("error");
});

app.listen(8080);
