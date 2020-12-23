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

createTodo('Example project',false, 'Title goes here', 'Description goes here', 1, 0, 2021, 1);

populateList('Example project');


let newItemBtn = document.createElement('button');
newItemBtn.id = 'newItemBtn';
newItemBtn.innerHTML = '+ Add task';
};