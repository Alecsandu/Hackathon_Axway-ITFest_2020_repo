const express = require("express");
const path = require("path");
const connectDB = require('./config/db')
const formidable = require('formidable')
const session = require('express-session')
const crypto = require('crypto');
const User = require("./config/models/User");

const app = express();

connectDB()

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: false
}))

app.post('/login', (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    
    var cifru = crypto.createCipheriv('aes-128-cbc', 'mypassword')
    var encrPass = cifru.update(fields.password, 'utf8', 'hex')
    encrPass += cifru.final('hex')
    let user = mongoose.findOne({email: fields.email, password: fields.password})
    if (user) {
      req.session.username = user
    }

    res.render('index')
  })
})

app.post('/signup', (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    let cifru = crypto.createCipheriv('aes-128-cbc', 'mypassword')
    var encrPass = cifru.update(fields.password, 'utf8', 'hex')
    encrPassword += cifru.final('hex')
    
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

      res.render('signin')
    } catch(err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }

  })
})

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
