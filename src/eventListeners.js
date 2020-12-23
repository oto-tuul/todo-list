import {defaultProject, newItemBtn} from './initialRender';
import {createProject, projectList} from './persistentProjects';
import {newProject, createProjectTab, populateList, newTodo, displayItemDetails} from './domModification';
export {initListeners, createProjectTab, populateList};

function initListeners() {

    document.getElementById('Example project').addEventListener('click', () => {
        populateList('Example project');
    });

    document.getElementById('newItemBtn').addEventListener('click', () => {
        newTodo();
    })
};