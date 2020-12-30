export {createProject, saveProjectList, loadProjectList, projectList}

let projectList = {};

let createProject =  function createProject(projectName) {
    let name = projectName;
    projectList[name] = [];
    saveProjectList();
};

const saveProjectList = function saveProjectList() {
    localStorage.setItem('projectList', JSON.stringify(projectList));
    console.log('ProjectList saved');
};

const loadProjectList = function loadProjectList() {
    projectList = JSON.parse(localStorage.getItem('projectList'));
};

