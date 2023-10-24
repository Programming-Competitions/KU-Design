const userData = require('../userData.json');
let username = "admin";
const tasksHandler = {
  items: [],
  addTask: function(task) {
    userData.users[username].tasks.push({
      title: String(task.title),
      details: String(task.details),
      date: String(task.date),
      priority: String(task.priority),
      projectId: String(task.projectId)
    });
        return this.items.push(task) - 1;
    },
    removeTask: function(index) {
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
        // Parse each task date from string to Date object
        for (let task of this.items) {
            if (task.date !== null) task.date = new Date(task.date);
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