// localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
// JSON.parse(localStorage.getItem('myLibrary')

export {saveProject, loadProject, createProject, addToProject, projectList}

let projectList = {};

let createProject =  function createProject(projectName) {
    let name = projectName;
    projectList[name] = [];
};

let addToProject = function addToProject (projectName, todo) {
    projectList[projectName].push(todo);
};

const saveProject = function saveProject(project) {
    localStorage.setItem(`${projectName}`, JSON.stringify(project)); 
};

const loadProject = function loadProject(project) {
    return JSON.parse(localStorage.getItem(`${projectName}`));
};

