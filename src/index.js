import './stylesheet.css';
import {createProject, saveProject, loadProject} from './persistentProjects';
import createTodo from './todoFactory';
import {init} from './initialRender';
import {initListeners} from './eventListeners';

init();
initListeners();

