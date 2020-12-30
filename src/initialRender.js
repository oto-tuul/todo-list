import createTodo from './todoFactory';
import {createProject, saveProjectList, loadProjectList} from './persistentProjects';
import {createProjectTab, populateProjectBar, populateList} from './domModification';
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

let listContainer = document.createElement('div');
listContainer.id = 'listContainer';
content.appendChild(listContainer);

if (JSON.parse(localStorage.getItem('projectList')) !== null) {
    loadProjectList();
    populateProjectBar();
    populateList('Example project');
    return;
};

createProject('Example project');
createProjectTab('Example project');

createTodo('Example project',false, 'Title goes here', 'Description goes here', 1, 0, 2021, '1');

saveProjectList();

populateList('Example project');

document.getElementById('Example project').addEventListener('click', () => {
    populateList('Example project');
});

};