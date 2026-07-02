//alert("JS actif !");
//console.log("js read");

// variables declaration
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

//console.log("catched elements:", { taskInput, addTaskButton, taskList });

// adding a task
addTaskButton.addEventListener('click', function() {

    //console.log("click detected");
    addTask()
    
});

taskInput.addEventListener('keydown', function(event){

    if (event.key === 'Enter'){addTask()}
});

function addTask(){
    // get task input
    const taskText = taskInput.value;

    // verify the input is not empty
    if (taskText !== "") {

        // create new <li> tag
        const newLi = document.createElement('li');
        newLi.textContent = taskText;

        // add <li> in <ul>
        taskList.appendChild(newLi);

        // save tasks in localStorage
        saveTasks();

        // empty input
        taskInput.value = "";
    }
}

function saveTasks(){
    const tasks = [];

    const liElements = taskList.querySelectorAll('li');
 
    liElements.forEach(function(li) {
        tasks.push(li.textContent);
    });

    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function loadTasks() {
    // On récupère la chaîne de texte du LocalStorage
    const savedTasks = localStorage.getItem('myTasks');
    
    // Si on a trouvé des tâches sauvegardées
    if (savedTasks) {
        // On reconvertit le texte en vrai tableau JavaScript
        const tasksArray = JSON.parse(savedTasks);
        
        // Pour chaque tâche du tableau, on recrée un <li> à l'écran
        tasksArray.forEach(function(taskText) {
            const newLi = document.createElement('li');
            newLi.textContent = taskText;
            taskList.appendChild(newLi);
        });
    }
}

// load the tasks
loadTasks();