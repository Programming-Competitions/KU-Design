const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});
app.get('/route', (req, res) => {
  res.sendFile('routes.html', { root: __dirname });
});

this.current_user = NaN

let listData = {
  users: {
    vatsa: {
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
    },
    raj: {
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
    }
  }
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
    password
  };

  // add a notes route for them
  listData.users[username] = {
    lists: {
      newList: {
        tasks: {
          label: "Welcome",
          other_label: "Get work done!",
        },
      },
    }
  }

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
  // dont use json stringify on this
  if (authData.users[username].password != password) {
    //console.log(authData.users[username].password === password);
    //console.log(typeof authData.users[username].password === typeof password);
    res.status(403).send(`${typeof authData.users[username].password}:${typeof password} Incorrect password`);
    return;
  }

  this.current_user = username

  res.status(200).send('User logged in successfully');
});

// Get all lists
app.get('/todo', async (req, res) => {
  if (this.current_user == NaN) {
    res.status(403).send('Please Login to use this feature');
  }

  res.status(200).send(JSON.stringify(
    listData.users[this.current_user]
  ));
});

// get a specific list
app.get('/list', async (req, res) => {
  const lName = req.query.l;

  if (this.current_user == NaN) {
    res.status(403).send('Please Login to use this feature');
  } if (listData.users[this.current_user] == undefined){
    res.status(403).send('Please Login to use this feature');
  }

  res.status(200).send(JSON.stringify(
    listData.users[this.current_user].lists[lName]
  ));
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
