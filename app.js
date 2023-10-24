import "./style.css";
import "./images/GitHub-Mark.png";
import * as storage from "./modules/storage.js";

let username;

fetch('http://127.0.0.1:8080/username') // Replace with the URL of the website you want to fetch
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyText = doc.querySelector('body').textContent;
        username = bodyText;

        // Now `username` contains the body text of the website
        console.log(username);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    username = "admin" //for now TODO
console.log(username)

storage.initStorage();