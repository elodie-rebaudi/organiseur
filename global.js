document.addEventListener("DOMContentLoaded", () =>{

    /* home Button*/
    const homeButton = document.createElement("a");
    homeButton.href = "index.html";
    homeButton.className = "home-btn";

    const homeIcon = document.createElement("img");
    homeIcon.src = "icons/homebutton.png";
    homeIcon.alt = "Home icon";
    homeIcon.className = "card-icon";

    homeButton.appendChild(homeIcon);

    /*planner button*/
    const plannerButton = document.createElement("a");
    plannerButton.href = "planner.html";
    plannerButton.className = "planner-btn";

    const plannerIcon = document.createElement("img");
    plannerIcon.src = "icons/planner.png";
    plannerIcon.alt = "planner icon";
    plannerIcon.className = "card-icon";

    plannerButton.appendChild(plannerIcon);

    /*todo button*/
    const todoButton = document.createElement("a");
    todoButton.href = "todo.html";
    todoButton.className = "todo-btn";

    const todoIcon = document.createElement("img");
    todoIcon.src = "icons/todo.png";
    todoIcon.alt = "todo icon";
    todoIcon.className = "card-icon";

    todoButton.appendChild(todoIcon);

    /*cookbook button*/
    const cookbookButton = document.createElement("a");
    cookbookButton.href = "cookbook.html";
    cookbookButton.className = "cookbook-btn";

    const cookbookIcon = document.createElement("img");
    cookbookIcon.src = "icons/cookbook.png";
    cookbookIcon.alt = "cookbook icon";
    cookbookIcon.className = "card-icon";

    cookbookButton.appendChild(cookbookIcon);

    document.body.appendChild(homeButton);
    document.body.appendChild(plannerButton);
    document.body.appendChild(todoButton);
    document.body.appendChild(cookbookButton);
});