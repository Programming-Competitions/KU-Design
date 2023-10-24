import { tasksHandler, task } from "./tasks.js";
import { projectsHandler } from "./projects.js";
import { renderProjects } from "./ui/ui-projects.js";

function initStorage() {
    // Try to get data
    projectsHandler.items = JSON.parse(localStorage.getItem("projects"));
    tasksHandler.items = JSON.parse(localStorage.getItem("tasks"));

    // If there was no data in localStorage assign some test data
    if (projectsHandler.items === null || tasksHandler.items === null) {
        const testProjectsData = [
            {
                id: 0,
                title: "Home",
            }
        ]
        const testTasksData = [];

        localStorage.setItem("projects", JSON.stringify(testProjectsData));
        localStorage.setItem("tasks", JSON.stringify(testTasksData));

        projectsHandler.items = testProjectsData;
        tasksHandler.items = testTasksData;
    }

    projectsHandler.init();
    tasksHandler.init();
    renderProjects();
}

function updateProjectsStorage() {
    localStorage.setItem("projects", JSON.stringify(projectsHandler.items));
}

function updateTasksStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksHandler.items));
}


export {
    initStorage,
    updateProjectsStorage,
    updateTasksStorage,
}