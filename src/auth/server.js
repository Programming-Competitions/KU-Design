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
let currentUser;

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
        tasks: [],
        projects: []
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

app.get('/sendTasks', async (req, res) => {
    if (!currentUser) {
        res.status(403).send('No user logged in');
        return;
    }

    let user = userJSON.users[currentUser];
    if (!user) {
        console.log("User not found.");
        return;
    }

    console.log(user.tasks);

    const newTask = {
        title: req.query.title,
        details: req.query.details,
        date: req.query.date,
        priority: req.query.priority,
        project: req.query.project,
    };

    // Ensure user.tasks is an array
    if (!Array.isArray(user.tasks)) {
        user.tasks = [];
    }

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

app.get('/getTasks', (req, res) => {
    fs.readFile('./src/userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading userData.json:', err);
            return res.status(500).json({ error: 'Error reading userData.json' });
        }

        try {
            const userData = JSON.parse(data);
            const user = userData.users[currentUser];

            if (user && user.tasks && Array.isArray(user.tasks)) {
                const tasks = user.tasks;
                console.log('Tasks:', tasks);
                res.json({ tasks }); // Send tasks as a JSON response
            } else {
                console.error('User or tasks not found in the JSON data.');
                res.status(404).json({ error: 'User or tasks not found' });
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing JSON' });
        }
    });
});


app.get('/sendProjects', async (req, res) => {
    if (!currentUser) {
        res.status(403).send('No user logged in');
        return;
    }

    let user = userJSON.users[currentUser];
    if (!user) {
        console.log("User not found.");
        return;
    }

    console.log(user.projects);

    const newTask = {
        title: req.query.title,
    };

    // Ensure user.projects is an array
    if (!Array.isArray(user.projects)) {
        user.projects = [];
    }

    user.projects.push(newTask);

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

app.delete('/deltask', (req, res) => {
    const list = req.query.list
    const task = req.query.task;

    if (this.current_user == NaN) {
        res.status(403).send('Please Login to use this feature');
    } if (listData.users[this.current_user] == undefined) {
        res.status(403).send('Please Login to use this feature');
    }

    for (let i = 0; i < listData.users[this.current_user].lists[list].tasks.length; i++) {
        //console.log("For loop")
        if (listData.users[this.current_user].lists[list].tasks[i].label == task) {
            //console.log("found it")
            listData.users[this.current_user].lists[list].tasks.splice(i, 1);
            res.status(200).send(JSON.stringify(
                listData.users[this.current_user].lists[list].tasks
            ))
        }
    }
})

app.post('/addtask', async (req, res) => {
    const list = req.query.list
    const task = req.query.task;
    const deadline = new Date(req.query.deadline);

    if (this.current_user == NaN) {
        res.status(403).send('Please Login to use this feature');
    } if (listData.users[this.current_user] == undefined) {
        res.status(403).send('Please Login to use this feature');
    }

    taskObj = {
        label: task,
        deadline: deadline,
    }

    listData.users[this.current_user].lists[list].tasks.push(taskObj)
    res.status(200).send(JSON.stringify(
        listData.users[this.current_user].lists[list].tasks
    ));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})