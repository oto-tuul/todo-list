import {createProject, saveProjectList, projectList, loadProjectList} from './persistentProjects'
import createTodo from './todoFactory';
export {newProject, createProjectTab,populateProjectBar, populateList, newTodo, displayItemDetails};

var activeProjectName;

let newProject = function newProject() {
    if(document.getElementById('newProjectBtn')) {
        projectBar.removeChild(newProjectBtn);
    };

    let projectForm = document.createElement('input');
    projectForm.placeholder = 'Project name';
    projectForm.id = 'projectForm';
    projectBar.appendChild(projectForm);

    projectForm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            let projectName = document.getElementById('projectForm').value;
            projectBar.removeChild(projectForm);
            createProject(projectName);
            
            createProjectTab(projectName);
        };
    });
};

let createProjectTab = function createProjectTab(name) {
    let projectTab = document.createElement('a');
    projectTab.innerHTML = name;
    projectTab.href = '#';
    projectTab.classList.add('projectTab');
    projectTab.id = name;
    let removeProjectBtn = document.createElement('button');
    removeProjectBtn.innerHTML = 'x';
    removeProjectBtn.classList.add('removeProjectBtn');
    projectTab.appendChild(removeProjectBtn);
    projectBar.appendChild(projectTab);

    // let newProjectBtn = document.createElement('button');
    // newProjectBtn.id = 'newProjectBtn';
    // newProjectBtn.innerHTML = '+';
    // projectBar.appendChild(newProjectBtn);

    activeProjectName = projectTab.id;

    projectTab.children[0].addEventListener('click', (event) => {
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild); 
        }
        projectBar.removeChild(projectTab);
        event.stopPropagation();
    });

    // document.getElementById('newProjectBtn').addEventListener('click', () => {
    //     newProject()
    // });

    projectTab.addEventListener('click', () => {
        populateList(name);
        activeProjectName = projectTab.id;
    });
};

let populateProjectBar = function populateProjectBar() {
    loadProjectList();
    while (projectBar.firstChild) {
        projectBar.removeChild(projectBar.firstChild);
    };

    Object.keys(projectList).forEach(element => {
        createProjectTab(`${element}`);
    });

    let newProjectBtn = document.createElement('button');
    newProjectBtn.id = 'newProjectBtn';
    newProjectBtn.innerHTML = '+';
    projectBar.appendChild(newProjectBtn);
    
    document.getElementById('newProjectBtn').addEventListener('click', () => {
        newProject()
    });
};

let populateList = function populateList (projectKey) {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    };

    projectList[projectKey].forEach(element => {
        let listItem = document.createElement('div');
        listItem.classList.add('listItem');

        let itemCheck = document.createElement('p');
        itemCheck.classList.add('itemCheck');
        itemCheck.innerHTML = ' ';
        if (element.check == true) {
            itemCheck.innerHTML = '✓';
            listItem.classList.add('doneItem');
        };
        listItem.appendChild(itemCheck);

        let itemText = document.createElement('p');
        itemText.classList.add('itemText');
        itemText.innerHTML = `${element.title} ${element.dueDate}`;
        listItem.appendChild(itemText);
        listContainer.appendChild(listItem);

        let removeItemBtn = document.createElement('button');
        removeItemBtn.classList.add('removeItemBtn');
        removeItemBtn.innerHTML = 'x';
        listItem.appendChild(removeItemBtn);

        itemCheck.addEventListener('click', () => {
            if (element.check == false) {
                element.check = true;
                itemCheck.innerHTML = '✓';
                console.log(element);
                saveProjectList();
                listItem.classList.add('doneItem');
            } else {
                element.check = false;
                itemCheck.innerHTML = ' ';
                console.log(element);
                saveProjectList();
                listItem.classList.remove('doneItem');
            }
        });

        let removeItem = function removeItem() {
            let index = projectList[projectKey].findIndex(x => x.title === element.title)
            if (index > -1) {
                projectList[projectKey].splice(index, 1);
                saveProjectList();
            };
            listContainer.removeChild(listItem);
        };

        removeItemBtn.addEventListener('click', () => {
            removeItem();
        });

        let displayDetails = () => {
            displayItemDetails(listItem, element);

            let itemChildren = listItem.childNodes;
            for (let i = 0; i < itemChildren.length; i++) {
                itemChildren[i].addEventListener('click', (e) => {
                    if (itemChildren[i] !== e.target)
                        return;
                    let fieldPlaceholder = itemChildren[i].childNodes[0].nodeValue;
                    let elementField = document.createElement('input');
                    elementField.placeholder = `${fieldPlaceholder}`;
                    elementField.attributeRef = itemChildren[i].attributeRef;
                    itemChildren[i].replaceWith(elementField);
                    e.stopPropagation();

                    itemChildren[i].addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            let insAttribute = itemChildren[i].attributeRef;
                            let insNewValue = elementField.value;
                            element[insAttribute] = insNewValue;
                            saveProjectList();
                            console.log(element);
                            displayDetails();
                        };
                    });
                });
            };

            let priorityButtons = document.getElementsByClassName('priorityButton');
            for (let i = 0; i < priorityButtons.length; i++) {
                priorityButtons[i].addEventListener('click', () => {
                    element.priority = document.querySelector('input[name="priority"]:checked').value;
                    console.log(element);
                    saveProjectList();
                });

            };

            listItem.addEventListener('click', (e) => {
                if (listItem !== e.target)
                    return;
                populateList(projectKey);
            });
        };

        listItem.addEventListener('click',(e) => {
            if (listItem !== e.target && itemText !== e.target) return;

            displayDetails();
        });
        
    });

    let newItemBtn = document.createElement('button');
    newItemBtn.innerHTML = '+ Add task';
    newItemBtn.id = 'newItemBtn';
    listContainer.appendChild(newItemBtn);

    newItemBtn.addEventListener('click', () => {
        newTodo();
    });
};

let createPriorityChoice = function createPriorityChoice(parent) {
    let priorityForm = document.createElement('form');
    priorityForm.id = 'priorityForm';
        let priorityFormLabel = document.createElement('label');
        priorityFormLabel.for = 'priorityForm';
        priorityFormLabel.innerHTML = 'Priority:'
        priorityForm.appendChild(priorityFormLabel);
        let priorityButton1 = document.createElement('input');
        priorityButton1.type = 'radio';
        priorityButton1.name = 'priority';
        priorityButton1.id = '1';
        priorityButton1.classList.add('priorityButton');
        priorityButton1.value = '1';
        let priorityLabel1 = document.createElement('label');
        priorityLabel1.for = '1';
        priorityLabel1.innerHTML = '1';
        priorityForm.appendChild(priorityButton1);
        priorityForm.appendChild(priorityLabel1);
        let priorityButton2 = document.createElement('input');
        priorityButton2.type = 'radio';
        priorityButton2.name = 'priority';
        priorityButton2.id = '2';
        priorityButton2.classList.add('priorityButton');
        priorityButton2.value = '2';
        let priorityLabel2 = document.createElement('label');
        priorityLabel2.for = '2';
        priorityLabel2.innerHTML = '2';
        priorityForm.appendChild(priorityButton2);
        priorityForm.appendChild(priorityLabel2);
        let priorityButton3 = document.createElement('input');
        priorityButton3.type = 'radio';
        priorityButton3.name = 'priority';
        priorityButton3.id = '3';
        priorityButton3.classList.add('priorityButton');
        priorityButton3.value = '3';
        let priorityLabel3 = document.createElement('label');
        priorityLabel3.for = '3';
        priorityLabel3.innerHTML = '3';
        priorityForm.appendChild(priorityButton3);
        priorityForm.appendChild(priorityLabel3);

    parent.appendChild(priorityForm);
    }

let newTodo = function newTodo() {
    let newItemBtn = document.getElementById('newItemBtn');
    listContainer.removeChild(newItemBtn);

    let todoForm = document.createElement('div');
    todoForm.id = 'todoForm';

    let titleField = document.createElement('input');
    titleField.placeholder = 'Task name';
    todoForm.appendChild(titleField);
    let descriptionField = document.createElement('input');
    descriptionField.placeholder = 'Task description';
    todoForm.appendChild(descriptionField);
    let dayField = document.createElement('input');
    dayField.placeholder = 'Day';
    todoForm.appendChild(dayField);
    let monthField = document.createElement('input');
    monthField.placeholder = 'Month';
    todoForm.appendChild(monthField);
    let yearField = document.createElement('input');
    yearField.placeholder = 'Year';
    todoForm.appendChild(yearField);

    createPriorityChoice(todoForm);

    listContainer.appendChild(todoForm);

    let newItemBtnF = document.createElement('button');
    newItemBtnF.id = 'newItemBtnF';
    newItemBtnF.innerHTML = '+ Add task';
    listContainer.appendChild(newItemBtnF);

    document.getElementById('newItemBtnF').addEventListener('click', () => {
    console.log(activeProjectName);
    createTodo(`${activeProjectName}`, false, titleField.value, descriptionField.value, dayField.value, monthField.value, yearField.value, document.querySelector('input[name="priority"]:checked').value);
    populateList(`${activeProjectName}`);
    });

    todoForm.addEventListener('click', (e) => {
        if (todoForm !== e.target) return;
        populateList(`${activeProjectName}`);
    });
    
};

let displayItemDetails = function displayItemDetails(DOMItem, fromItem) {
    DOMItem.classList.add('details');
    DOMItem.innerHTML = '';
    let keyNames = Object.keys(fromItem);

    let itemTitle = document.createElement('p');
    itemTitle.id = 'itemTitle';
    itemTitle.classList.add('itemDetail');
    itemTitle.attributeRef = keyNames[1];
    itemTitle.innerHTML = `${fromItem.title}`;
    DOMItem.appendChild(itemTitle);

    let itemDescription = document.createElement('p');
    itemDescription.id = 'itemDescription';
    itemDescription.classList.add('itemDetail');
    itemDescription.attributeRef = keyNames[2];
    itemDescription.innerHTML = `${fromItem.description}`;
    DOMItem.appendChild(itemDescription);

    let itemDate = document.createElement('p');
    itemDate.id = 'itemDate';
    itemDate.classList.add('itemDetail');
    itemDate.attributeRef = keyNames[3];
    itemDate.innerHTML = `${fromItem.dueDate}`;
    DOMItem.appendChild(itemDate);

    createPriorityChoice(DOMItem);

    let priority = fromItem.priority;
    console.log(priority);

    let priorityButtons = document.getElementsByClassName('priorityButton');
    for (let i=0; i < priorityButtons.length; i++) {
        if (priorityButtons[i].id == priority) {
            priorityButtons[i].checked = true;
        }
    }
    

};