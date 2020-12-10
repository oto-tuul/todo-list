import './stylesheet.css';
import {createProject, saveProject, loadProject} from './persistentProjects';
import createTodo from './todoFactory';
import {init} from './initialRender';

init();

let testProject = createProject('testProject');
console.log(testProject);


let work = createTodo(false, 'title', 'description', 1, 2, 2021, 1);

testProject.addToProject(work);
console.log(testProject);

