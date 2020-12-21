import {format} from 'date-fns';
import {projectList} from './persistentProjects';

const editTodo = {
    toggleCheck() {
        this.check = !this.check;
    },
    editTitle(title) {
        this.title = title;
    },
    editDescription(description) {
        this.description = description;
    },
    editDueDate(dueDate) {
        this.dueDate = dueDate;
    },
    togglePriority() {
        if (this.priority === 1) {
            this.priority = 2;
        } else if (this.priority === 2) {
            this.priority = 3;
        } else if (this.priority === 3) {
            this.priority = 1;
        }
    },
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
    return todo;
};

export default createTodo;