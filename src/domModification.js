import {createProject, projectList} from './persistentProjects'
import createTodo from './todoFactory';
export {newProject, createProjectTab, populateList, newTodo, displayItemDetails};

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

    let newProjectBtn = document.createElement('button');
    newProjectBtn.id = 'newProjectBtn';
    newProjectBtn.innerHTML = '+';
    projectBar.appendChild(newProjectBtn);

    activeProjectName = projectTab.id;

    projectTab.children[0].addEventListener('click', (event) => {
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild); 
        }
        projectBar.removeChild(projectTab);
        event.stopPropagation();
    });

    document.getElementById('newProjectBtn').addEventListener('click', () => {
        newProject()
    });

    projectTab.addEventListener('click', () => {
        populateList(name);
        activeProjectName = projectTab.id;
    });
};

let populateList = function populateList (projectKey) {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    };

    projectList[projectKey].forEach(element => {
        let listItem = document.createElement('p');
        listItem.classList.add('listItem');
        listItem.innerHTML = `${element.check} ${element.title} ${element.dueDate}`;
        listContainer.appendChild(listItem);

        let removeItemBtn = document.createElement('button');
        removeItemBtn.classList.add('removeItemBtn');
        removeItemBtn.innerHTML = 'x';
        listItem.appendChild(removeItemBtn);

        removeItemBtn.addEventListener('click', () => {
            console.log(projectList)
            console.log(projectList[projectKey])
            let index = projectList[projectKey].findIndex(x => x.title === element.title)
            if (index > -1) {
                projectList[projectKey].splice(index, 1);
            };
            listContainer.removeChild(listItem);
        });

        listItem.addEventListener('click', function displayDetails() { 
            displayItemDetails(listItem, element);

            let itemChildren = listItem.childNodes;
            for(let i=0; i < itemChildren.length; i++) {
                itemChildren[i].addEventListener('click', (e) => {
                    if (itemChildren[i] !== e.target) return;
                    let fieldPlaceholder = itemChildren[i].childNodes[0].nodeValue;
                    let elementField = document.createElement('input');
                    elementField.placeholder = `$fieldPlaceholder}`;
                    itemChildren[i].replaceWith(elementField);
                    e.stopPropagation();
                });
            };
        listItem.removeEventListener('click', displayDetails);
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

let newTodo = function newTodo() {
    listContainer.removeChild(document.getElementById('newItemBtn'));

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
        priorityButton3.value = '3';
        let priorityLabel3 = document.createElement('label');
        priorityLabel3.for = '3';
        priorityLabel3.innerHTML = '3';
        priorityForm.appendChild(priorityButton3);
        priorityForm.appendChild(priorityLabel3);
    todoForm.appendChild(priorityForm);
    listContainer.appendChild(todoForm);

    let newItemBtnF = document.createElement('button');
    newItemBtnF.id = 'newItemBtnF';
    newItemBtnF.innerHTML = '+ Add task';
    listContainer.appendChild(newItemBtnF);

    document.getElementById('newItemBtnF').addEventListener('click', () => {
    console.log(activeProjectName);
    createTodo(`${activeProjectName}`, false, titleField.value, descriptionField.value, dayField.value, monthField.value, yearField.value, document.querySelector('input[name="priority"]:checked').value);
    console.log(projectList);
    populateList(`${activeProjectName}`);
    });
    
};

let displayItemDetails = function displayItemDetails(DOMItem, fromItem) {
    DOMItem.innerHTML = '';
        
    let itemCheck = document.createElement('p');
    itemCheck.id = 'itemCheck';
    itemCheck.innerHTML = `${fromItem.check}`;
    DOMItem.appendChild(itemCheck);

    let itemTitle = document.createElement('p');
    itemTitle.id = 'itemTitle';
    itemTitle.innerHTML = `${fromItem.title}`;
    DOMItem.appendChild(itemTitle);

    let removeItemBtn = document.createElement('button');
    removeItemBtn.classList.add('removeItemBtn');
    removeItemBtn.innerHTML = 'x';
    itemTitle.appendChild(removeItemBtn);

    let itemDescription = document.createElement('p');
    itemDescription.id = 'itemDescription';
    itemDescription.innerHTML = `${fromItem.description}`;
    DOMItem.appendChild(itemDescription);

    let itemDate = document.createElement('p');
    itemDate.id = 'itemDate';
    itemDate.innerHTML = `${fromItem.dueDate}`;
    DOMItem.appendChild(itemDate);

    let itemPriority = document.createElement('p');
    itemPriority.id = 'itemPriority';
    itemPriority.innerHTML = `${fromItem.priority}`;
    DOMItem.appendChild(itemPriority);

};