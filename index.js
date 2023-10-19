var express = require('express');
var app = express();

let listData = {
    "lists": {
      "sublist1": {
        "tasks": {
          "label": "description",
          "other_label": "other description"
        }
      },
      "sublist2": {
        "tasks": {
          "label": "description",
          "other_label": "other description"
        }
      }
    }
  }

let authData = {
    "users": {
      "vatsa": {
        "password": 1357
      },
      "raj": {
          "password": 2469
      }
    }
  }
  
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/login", (req, res, next) => {
    res.json(['username','password'])
});