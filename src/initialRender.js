import createTodo from './todoFactory';
export {init, defaultProject}

const defaultProject = [];

function init() {
let content = document.querySelector('#content');

let header = document.createElement('div');
header.id = 'header';
let headerText = document.createElement('h1');
headerText.id = 'headerText';
headerText.innerHTML = "Notable Todo List";
header.appendChild(headerText);
content.appendChild(header);

let projectBar = document.createElement('div');
projectBar.id = 'projectBar';
content.appendChild(projectBar);
let exampleProject = document.createElement('a');
exampleProject.innerHTML = 'Example Project';
exampleProject.href = '#Example';
exampleProject.classList.add('projectTab');
exampleProject.id = 'exampleProject'
let removeProjectBtn = document.createElement('button');
removeProjectBtn.innerHTML = 'x';
exampleProject.appendChild(removeProjectBtn);
projectBar.appendChild(exampleProject);
let newTodoBtn = document.createElement('button');
newTodoBtn.id = 'newTodoBtn';
newTodoBtn.innerHTML = '+';
projectBar.appendChild(newTodoBtn);

let defaultTodo = createTodo(false, 'Title goes here', 'Descritption goes here', 1, 0, 2021, 1);
defaultProject.push(defaultTodo);

let listContainer = document.createElement('div');
listContainer.id = 'listContainer';
let defaultItem = document.createElement('p');
defaultItem.classList.add('listItem');
defaultItem.innerHTML = `${defaultProject[0].check} ${defaultProject[0].title} ${defaultProject[0].description} ${defaultProject[0].dueDate} ${defaultProject[0].priority}`;
let newItemButton = document.createElement('button');
newItemButton.innerHTML = '+ Add task';
content.appendChild(listContainer);
listContainer.appendChild(defaultItem);
listContainer.appendChild(newItemButton);


document.getElementById('exampleProject').addEventListener('click',() => {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    defaultProject.forEach(element => {
        let defaultItem = document.createElement('p');
        defaultItem.classList.add('listItem');
        defaultItem.innerHTML = `${element.check} ${element.title} ${element.description} ${element.dueDate} ${element.priority}`;
        listContainer.appendChild(defaultItem);
    })
    let newItemButton = document.createElement('button');
    newItemButton.innerHTML = '+ Add task';
    listContainer.appendChild(newItemButton);
});

};