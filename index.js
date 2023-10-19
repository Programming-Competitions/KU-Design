var express = require("express");
var request = require("supertest");
var app = express();

app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

app.listen(3000, () => {
  console.log("Server running on port 3000");
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

app.get("/login", (req, res) => {
  user = req.query.u;
  pass = req.query.p;

  if (authData.users[user]) {
    if (authData.users[user].password == Number(pass)) {
      res.status(200).send("Welcome in!"); // Use res.status(200) for success
    } else {
      res.status(403).send("Wrong Password"); // Use res.status(403)
    }
  } else {
    res.status(403).send("You aren't a user, please register.");
  }
});

app.post("/register", (req, res) => {
  user = req.query.u; // Use req.body to access POST data
  pass = req.query.p;
  console.log(user,pass)

  if (authData.users[user] != undefined) {
    res.status(403).send("Already Registered, please use login");
  } else {
    authData.users[user] = {
      password: Number(pass),
    };
    res.status(200).send("Now Registered, please login");
  }
});

// You can use the following code to test the POST request using supertest
request(app)
  .post("/register?u=newMan&p=1234") // Use POST request
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
    console.log(res.text); // Log the response
  });

  // You can use the following code to test the POST request using supertest
request(app)
.get("/login?u=newMan&p=1234") // Use POST request
.expect(200)
.end(function (err, res) {
  if (err) throw err;
  console.log(res.text); // Log the response
});