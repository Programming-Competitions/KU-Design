taskArr = ["Try it out!", "🚀🚀🚀"];

function delArr() {
  // Get all checkboxes on the page
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Loop through each checkbox and check if it's checked
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];

    // If the checkbox is checked, get its corresponding label
    if (checkbox.checked) {
      var label = checkbox.labels[0].textContent;
      taskArr.pop(label);
      renderArr()
    }
  }
}

function renderArr() {
  /*
        Renders the array of tasks as a checklist
    */
  document.getElementById("tasklist").innerHTML = ""; // wipes it clean

  for (var i = 0; i < taskArr.length; i++) {
    // adds all the tasks
    document.getElementById("tasklist").innerHTML =
      document.getElementById("tasklist").innerHTML +
      `<input type="checkbox" id="task${i}" value="1" />
    <label for="task${i}" class="strikethrough">${taskArr[i]}</label><br />`;
  }
}

function addTask() {
  task = prompt("what task do you need to add?");
  taskArr.push(task);
  renderArr();
}

renderArr();

const del = document.getElementById("listClick"); // constant for deleted elements
del.addEventListener("click", () => {
  delArr();
});

const add = document.getElementById("taskAdd")

add.addEventListener("click", () => {
  addTask()
});

