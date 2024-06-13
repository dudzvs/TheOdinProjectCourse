import { createTaskElement } from './DOM.js';
import { getFromLocalStorage, savetoLocalStorage } from './localStorage.js';

class Task {
  constructor(text, id, isCompleted = false) {
    this.text = text;
    this.id = id;
    this.isCompleted = isCompleted;
  }
}

let tasks = [];

export function createNewTask(taskText) {
  const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask = new Task(taskText, taskId);

  tasks.push(newTask);
  const taskElement = createTaskElement(newTask);
  savetoLocalStorage('tasks', JSON.stringify(tasks));

  return taskElement;
}

export function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  savetoLocalStorage('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(getFromLocalStorage('tasks')) || [];

  savedTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    document.querySelector('.tasks').appendChild(taskElement);
  });

  tasks = savedTasks;
}
