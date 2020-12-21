import createTodo from './todoFactory';
import {createProject, projectList} from './persistentProjects';
import {newProject, createProjectTab, populateList, newTodo} from './domModification';
export {init}


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

createProject('Example project');

let listContainer = document.createElement('div');
listContainer.id = 'listContainer';
content.appendChild(listContainer);

createProjectTab('Example project');

createTodo('Example project',false, 'Title goes here', 'Descritption goes here', 1, 0, 2021, 1);

let defaultItem = document.createElement('p');
defaultItem.classList.add('listItem');
defaultItem.innerHTML = `${projectList['Example project'][0].check} ${projectList['Example project'][0].title} ${projectList['Example project'][0].description} ${projectList['Example project'][0].dueDate} ${projectList['Example project'][0].priority}`;
let newItemBtn = document.createElement('button');
newItemBtn.id = 'newItemBtn';
newItemBtn.innerHTML = '+ Add task';

listContainer.appendChild(defaultItem);
listContainer.appendChild(newItemBtn);

return newItemBtn;
};