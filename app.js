// variables declaration
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const completedTasksList = document.getElementById("completedTasksList");
const exportButton = document.getElementById('exportButton');

// exporting tasks

exportButton.addEventListener('click', function(){

    const getTaskData = (list) =>{
        const tasks =[];
        list.querySelectorAll('li span').forEach(span => tasks.push(span.textContent));
        return tasks;
    }

    const backupData = {
        myTasks: getTaskData(taskList),
        myCompletedTasks: getTaskData(completedTasksList)
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "todo-list-backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
});


// adding a task
addTaskButton.addEventListener('click', function() {
    addTask();
});

taskInput.addEventListener('keydown', function(event){

    if (event.key === 'Enter'){addTask();}
});

function displayTasks(taskText, isChecked = false) {
    const newLi = document.createElement('li');

    newLi.setAttribute('draggable', true)
            
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;
    
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    textSpan.addEventListener('dblclick', function(){
        const currentText = textSpan.textContent;
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.className = 'edit-input';

        newLi.replaceChild(editInput, textSpan);
        editInput.focus();

        function saveEdit() {
            if (editInput.value.trim() !== "") {
                textSpan.textContent = editInput.value;
            }
            if (newLi.contains(editInput)) {
                newLi.replaceChild(textSpan, editInput);
            }
            saveAllTasks();
        }

        editInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') saveEdit();
        });
        editInput.addEventListener('blur', saveEdit);
    });

    checkbox.addEventListener('change', function(){
        if (checkbox.checked){
            // send to the end of completed tasks list
            completedTasksList.appendChild(newLi);
        }
        else {
            // send to the end of uncompleted tasks 
            taskList.appendChild(newLi);
        }

        saveAllTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
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

        const newLi = displayTasks(taskText,false);

        // add <li> in <ul>
        taskList.appendChild(newLi);

        // save tasks in localStorage
        saveAllTasks();

        // empty input
        taskInput.value = "";
    }
};

function saveTasks(taskList, storageName){
    const tasks = [];

    const liElements = taskList.querySelectorAll('li');
 
    liElements.forEach(function(li) {
        // we just want the text
        const span = li.querySelector('span');
        if (span) {
            tasks.push(span.textContent);
        }
    });

    localStorage.setItem(storageName, JSON.stringify(tasks));
};

function saveAllTasks(){
    saveTasks(taskList, 'myTasks');
    saveTasks(completedTasksList, 'myCompletedTasks');
}

function loadTasks(taskList, storageName, isCompleted = false) {
    const savedTasks = localStorage.getItem(storageName);
    
    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);
        
        tasksArray.forEach(function(taskText) {
            const newLi = displayTasks(taskText,isCompleted);

            taskList.appendChild(newLi);
        });
    }
};

function deleteTask(liElement) {
    liElement.remove();
    saveAllTasks();
};

// load the tasks
loadTasks(taskList, 'myTasks', false);
loadTasks(completedTasksList, 'myCompletedTasks', true)