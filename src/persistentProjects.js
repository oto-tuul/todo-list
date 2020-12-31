export {createProject, deleteProject, saveProjectList, loadProjectList, projectList}

let projectList = {};

let createProject =  function createProject(projectName) {
    // projectList[projectName] = [];
    let newProject = {[projectName]: []};
    projectList = {...projectList, ...newProject};
    saveProjectList();
};

let deleteProject = function deleteProject(projectName) {
    delete projectList[projectName];
    saveProjectList();
}

const saveProjectList = function saveProjectList() {
    localStorage.setItem('projectList', JSON.stringify(projectList));
    console.log('ProjectList saved');
};

const loadProjectList = function loadProjectList() {
    projectList = JSON.parse(localStorage.getItem('projectList'));
};

