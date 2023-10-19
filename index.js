const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for sessions
app.use(
  session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true,
  })
);

let authData = {
  users: {
    vatsa: {
      password: '1357',
    },
    raj: {
      password: '2469',
    },
  },
};

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
      <label>Username: <input type="text" name="username"></label><br>
      <label>Password: <input type="password" name="password"></label><br>
      <input type="submit" value="Login">
    </form>
    <br>
    <h1>Register</h1>
    <form method="post" action="/register">
      <label>Username: <input type="text" name="username"></label><br>
      <label>Password: <input type="password" name="password"></label><br>
      <input type="submit" value="Register">
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (authData.users[username] && authData.users[username].password === password) {
    req.session.authenticated = true;
    req.session.username = username;
    res.redirect('/dashboard');
  } else {
    res.send('Login failed. <a href="/login">Try again</a>');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.authenticated) {
    res.send(`Welcome, ${req.session.username}! You are now logged in.`);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!authData.users[username]) {
    authData.users[username] = { password };
    res.send(`User '${username}' has been registered. <a href="/login">Login</a>`);
  } else {
    res.send('Username is already taken. <a href="/login">Try again</a>');
  }
});
