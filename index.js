const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

let listData = {
  lists: {
    sublist1: {
      tasks: {
        label: "description",
        other_label: "other description",
      },
    },
    sublist2: {
      tasks: {
        label: "description",
        other_label: "other description",
      },
    },
  },
};

let authData = {
  users: {
    vatsa: {
      password: 1357,
    },
    raj: {
      password: 2468,
    },
  },
};


// Define the register route
app.post('/register', async (req, res) => {
  const username = req.body.u;
  const password = req.body.p;

  // Check if the username is already registered
  if (authData.users[username] !== undefined) {
    res.status(403).send('Username already registered');
    return;
  }

  // Register the new user
  authData.users[username] = {
    password,
  };

  res.status(200).send('User registered successfully');
});

// Define the login route
app.get('/login', async (req, res) => {
  const username = req.query.u;
  const password = req.query.p;

  // Check if the user exists
  if (authData.users[username] === undefined) {
    res.status(403).send('User does not exist');
    return;
  }

  // Check if the password is correct
  if (JSON.stringify(authData.users[username].password) !== password) {
    res.status(403).send('Incorrect password');
    return;
  }

  // Login the user
  // TODO: Implement a more robust login mechanism, such as using JSON Web Tokens (JWTs)
  req.session.user = username;

  res.status(200).send('User logged in successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
