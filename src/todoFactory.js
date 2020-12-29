import {format} from 'date-fns';
import {projectList, saveProjectList} from './persistentProjects';

const editTodo = {
    editAttribute(attribute, newValue) {
        this[attribute] = newValue;
    }
};

const createTodo = function createTodo(projectName, check, title, description, day, month, year, priority) {
    let todo = Object.create(editTodo);
    todo.check = check;
    todo.title = title;
    todo.description = description;
    todo.dueDate = format(new Date(year, month, day), 'dd/MM/yyyy');
    todo.priority = priority;
    projectList[projectName].push(todo);
    console.log(projectList);
    saveProjectList();
    return todo;
};

export default createTodo;