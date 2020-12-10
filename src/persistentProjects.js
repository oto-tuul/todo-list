// localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
// JSON.parse(localStorage.getItem('myLibrary')

const editProject = {
    editProjectName (newName) {
        this.name = newName;
    },
    addToProject (todo) {
        this.projectList.push(todo);
    }
}

const createProject = function createProject(projectName) {
    let project = Object.create(editProject);
    project.name = projectName;
    project.projectList = [];
    return project;
};

const saveProject = function saveProject(projectName) {
    localStorage.setItem(`${projectName}`, JSON.stringify(project)); 
};

const loadProject = function loadProject(projectName) {
    return JSON.parse(localStorage.getItem(`${projectName}`));
};

export {createProject, saveProject, loadProject}