document.addEventListener("DOMContentLoaded", () =>{

    const homeButton = addButton("home");
    const plannerButton = addButton("planner");
    const todoButton = addButton("todo");
    const cookbookButton = addButton("cookbook");
    const videogamesButton = addButton("videogames");
    const tvshowsButton = addButton("tvshows");

    const navMenu = document.createElement("div");
    navMenu.className = "global-nav-menu";

    navMenu.appendChild(homeButton);
    navMenu.appendChild(plannerButton);
    navMenu.appendChild(todoButton);
    navMenu.appendChild(cookbookButton);
    navMenu.appendChild(videogamesButton);
    navMenu.appendChild(tvshowsButton);

    document.body.prepend(navMenu);
});

function addButton(name){
    btn = document.createElement("a");
    if (name=="home"){
        btn.href = "index.html";
    } else {
        btn.href = `${name}.html`;
    }
    btn.className = `${name}-btn`;

    const icon = document.createElement("img");
    icon.src = `icons/${name}.png`;
    icon.alt = `${name} icon`;
    icon.className = "card-icon";   

    btn.appendChild(icon);

    return btn;
};