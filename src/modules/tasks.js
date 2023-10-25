import { composeNewTask, initTask } from "./ui/ui-tasks";

const userData = require('../userData.json');
let username = "admin";
const tasksHandler = {
    items: [],
    addTask: function (task) {
        return this.items.push(task) - 1;
    },
    removeTask: function (index) {
        return this.items.splice(index, 1);
    },
    removeProjectTasks: function (id) {
        this.items = this.items.filter((task) => task.projectIndex !== id);
    },
    toggleCompletedState: function (index) {
        this.items[index].completed = (this.items[index].completed) ? false : true;
        return this.items[index].completed;
    },
    init: function () {
        let tasks;

        // Fetch the tasks from the server
        fetch('http://127.0.0.1:8080/getTasks')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Assuming 'data' contains your tasks data
                tasks = data;

                // Now 'tasks' contains the tasks from the server
                console.log('Fetched tasks:', tasks);

                // You can perform further operations with 'tasks' here
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });

        // Assuming you have an array of tasks named 'tasks'

        // Assuming you have an array of tasks named 'tasks'

        for (const task of tasks) {
            const { title, details, date, priority, project } = task;
            addNewTask(title, details, date, priority, project);
        }
    }
}

// Factory function to create new tasks
function task(title, details, date, priority, projectIndex, completed = false) {
    return {
        title,
        details,
        date,
        priority,
        completed,
        projectIndex,
    }
}


export {
    task,
    tasksHandler
};

