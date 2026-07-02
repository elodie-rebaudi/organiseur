// variables declaration
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// adding a task
addTaskButton.addEventListener('click', function() {
    addTask();
});

taskInput.addEventListener('keydown', function(event){

    if (event.key === 'Enter'){addTask()}
});

function displayTasks(taskText) {
    const newLi = document.createElement('li');
            
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.className = 'deleteButton';
    
    newLi.appendChild(checkbox);
    newLi.appendChild(textSpan);
    newLi.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        deleteTask(newLi)
    });

    return newLi;
};

function addTask(){
    // get task input
    const taskText = taskInput.value;

    // verify the input is not empty
    if (taskText !== "") {

        const newLi = displayTasks(taskText);

        // add <li> in <ul>
        taskList.appendChild(newLi);

        // save tasks in localStorage
        saveTasks();

        // empty input
        taskInput.value = "";
    }
};

function saveTasks(){
    const tasks = [];

    const liElements = taskList.querySelectorAll('li');
 
    liElements.forEach(function(li) {
        // we just want the text
        const span = li.querySelector('span');
        if (span) {
            tasks.push(span.textContent);
        }
    });

    localStorage.setItem('myTasks', JSON.stringify(tasks));
};

function loadTasks() {
    // On récupère la chaîne de texte du LocalStorage
    const savedTasks = localStorage.getItem('myTasks');
    
    // Si on a trouvé des tâches sauvegardées
    if (savedTasks) {
        // On reconvertit le texte en vrai tableau JavaScript
        const tasksArray = JSON.parse(savedTasks);
        
        // Pour chaque tâche du tableau, on recrée un <li> à l'écran
        tasksArray.forEach(function(taskText) {

            const newLi = displayTasks(taskText);

            taskList.appendChild(newLi);
        });
    }
};

function deleteTask(liElement) {
    liElement.remove();
    saveTasks();
};

// load the tasks
loadTasks();