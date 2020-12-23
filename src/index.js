import './stylesheet.css';
import {createProject, saveProject, loadProject} from './persistentProjects';
import createTodo from './todoFactory';
import {init} from './initialRender';
import {initListeners} from './eventListeners';
import {populateList} from './domModification';

init();
initListeners();
// populateList('Example project');

