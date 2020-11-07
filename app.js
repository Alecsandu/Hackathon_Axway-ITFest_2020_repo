const express = require("express");
const path = require("path");
const session = require('express-session')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const fs = require('fs')
const formidable = require('formidable');
const connectDB = require('./config/db')
const User = require("./config/models/User");
const Project = require("./config/models/Project")
const Card = require("./config/models/Card")
const Column = require("./config/models/Column")

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

app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: false
}));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/signin", function (req, res) {
    res.render("signin");
});

app.post('/login', async (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    
    var cifru = crypto.createCipheriv('aes-128-cbc', 'mypassword')
    var encrPass = cifru.update(fields.password, 'utf8', 'hex')
    encrPass += cifru.final('hex')
    let user = mongoose.findOne({email: fields.email, password: fields.password})
    if (user) {
      req.session.id = user.id
    }

    res.render('index', user)
  })
})

app.post('/signup', async (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {

    let cifru = crypto.createCipheriv('aes-128-cbc', 'mypassword')
    var encrPass = cifru.update(fields.password, 'utf8', 'hex')
    encrPass += cifru.final('hex')
    
    try{
    
      let user = await User.findOne({ email: fields.email})
      if (user) {
        return res.status(400).render('error')
      }

      user = new User({
        email: fields.email,
        password: fields.password
      })

      await user.save()

      res.render('signin', user)
    } catch(err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }

  })
})

app.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id})
  req.session.user = user
})

app.post("/project", async (req, res) => {
  if (!req.body.project_id){
    project = new Project({
      name:req.body.name,
      team:[req.body.user_id],
      columns:[]
    })
  }

  else{
    project = await Project.findOne({_id: req.body.project_id})
    project.team.push(req.body.user_id)
  }

  await project.save()
  res.json(project)

})

app.post("/columns", async (req, res) => {
  const project = await Project.findOne({_id: req.body.project_id})
  const column = new Column({
    name: req.body.name,
    cards:[]
  })

  project.columns.push(column)
})

app.post("/cards", async (req, res) => {
  const project = await Project.findOne({_id: req.body.project_id})
  for (column of project.columns) {
    if (column._id == req.body.id){
      column.cards.push(req.body.card_id)
    }
  }
})

app.use(function (req, res) {
  res.status(404).render("error");
});

app.listen(8080);
