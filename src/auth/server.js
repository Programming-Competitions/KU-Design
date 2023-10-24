// import { task } from '../modules/tasks';
const express = require('express')
const fs = require('fs'); // Node.js File System module
const bodyParser = require('body-parser'); // Add body-parser
const path = require('path');
const cors = require('cors');
const authJSON = JSON.parse(fs.readFileSync('./src/auth/auth.json', 'utf8'));
const userJSON = JSON.parse(fs.readFileSync('./src/userData.json', 'utf8'))
const app = express()
const port = 8080
let username
let currentUser = "admin"

let authData = authJSON
let userData = userJSON

app.use(express.static('public'));
app.set('views', path.join(__dirname, ''));
app.use(cors());

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (Array.isArray(authJSON)) {
    authJSON.forEach(item => {
        authData.users[item.username] = {
            password: parseInt(item.password),
        };
    });
} else {
    // Handle the case where authJSON is not an array
}

app.get('/', (req, res) => {
    res.render('./auth.ejs');
});

app.get('/username', (req, res) => {
    res.send(currentUser)
})

// Define the register route
app.post('/register', (req, res) => {
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

    userData.users[username] = {
        tasks: {},
        projects: {}
    }

    currentUser = username

    // Write the updated authData to the JSON file
    fs.writeFileSync('./src/auth/auth.json', JSON.stringify(authData, null, 2));
    fs.writeFileSync('./src/userData.json', JSON.stringify(userData, null, 2));

    res.redirect('http://localhost:8081/');
});

// Define the login route
// app.get('/login', async (req, res) => {
//     const username = req.query.u;
//     const password = req.query.p;

//     console.log(authData.users["raj"])
//     console.log(authData.users["raj"].password)

//     // Check if the user exists
//     if (authData.users[username] === undefined) {
//         res.status(403).send('User does not exist');
//     } else if (authData.users[username].password != password) {
//         console.log(authData.users[username].password === password);
//         console.log(typeof authData.users[username].password === typeof password);
//         alert("Incorrect Password");
//     } else {
//         this.current_user = username
//         currentUser = username

//         res.redirect('http://localhost:8081');
//         // res.status(200).send(`
//         // // <h1>Logged in</h1>
//         // // <p>Head to Dashboard at</p> <br><br> 
//         //  <a href="http://localhost:8081/">Here</a>`
//         // );
//     }
// });

app.get('/login', async (req, res) => {
    const username = req.query.u;
    const password = req.query.p;

    // Check if the user exists
    if (authData.users[username] === undefined) {
        res.status(403).send('User does not exist');
    } else if (authData.users[username].password != password) {
        res.status(401).send('Incorrect Password');
    } else {
        this.current_user = username
        currentUser = username

        res.redirect('http://localhost:8081');
    }
});



app.get('/sendJson', async (req, res) => {
    // const json = req.query.json;
    // console.log(__dirname)
    // fs.writeFileSync('./src/userData.json', json);
    // res.status(200).send(`Noice 69`);

    if (!currentUser) {
        res.status(403).send('No user logged in');
        return;
    }

    fs.readFile('./src/userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        let userJSON = JSON.parse(data);

        let user = userJSON.users[currentUser];
        if (!user) {
            console.log("User not found.");
            return;
        }

        console.log(user.tasks)

        const newTask = {
            title: req.query.title,
            details: req.query.details,
            date: req.query.date,
            priority: req.query.priority,
            projectId: req.query.projectId,
        };

        user.tasks.push(newTask);

        // Write the updated JSON back to the file
        fs.writeFile('./src/userData.json', JSON.stringify(userJSON, null, 2), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                res.status(500).send('Failed to add the task');
            } else {
                console.log("Task added successfully!");
                res.status(200).send('Task added successfully');
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})