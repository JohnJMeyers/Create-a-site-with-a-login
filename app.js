const express = require('express');
const mustacheExpress = require('mustache-express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

let users = [
  {user: 'lilmama', name: 'megan', email: 'lilmegly@gmail.com', password: '123'},
  {user: 'jdawg', name: 'john', email: 'johnjohnson@gmail.com', password: '123'}
]

let login = []

let loggedIn = true;

app.get('/login', function(req, res) {
  res.render('login');
})

app.get('/signup', function (req, res) {
  res.render('signup');
})

app.get('/', function (req, res) {

  if (loggedIn) {
    res.redirect('login')
  } else {
    res.render('home', {
      user: login[0].user,
      name: login[0].name,
      email: login[0].email
    })
  }
})

app.post('/login', function (req, res) {
  user = req.body.user;
  name = req.body.name;
  email = req.body.email;
  pass = req.body.password;
  login.push({user: user, name: name, email: email})

  for(let i = 0; i < users.length; i++) {
    if ( users[i].user === user && users[i].password === pass) {
      loggedIn = false;
      res.redirect('/')
      return
    }
  }
    res.redirect('/login');
    return
})

app.post('/signup', function (req, res) {
   user = req.body.user;
   pass = req.body.password;
   name = req.body.name;
   email = req.body.email;

  login.push({user: user, name: name, email: email,});
  users.push({user: user, name: name, email: email, password: pass});
  loggedIn = false;
  res.redirect('/')
})

app.get('/logout', function (req, res) {
  loggedIn = true;
  login = []
  res.redirect('/')
    return
})

app.listen(3000, function () {
  console.log('Everything looks great!')
})
