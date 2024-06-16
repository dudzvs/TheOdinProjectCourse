import {
  createTaskElement,
  removeCompletedTasks,
  updateTaskCount,
} from './DOM.js';
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
  updateTaskCount(tasks);

  return taskElement;
}

export function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  savetoLocalStorage('tasks', JSON.stringify(tasks));
  updateTaskCount(tasks);
}

export function filterTasks(filter) {
  const tasksBox = document.querySelector('.tasks');
  tasksBox.innerHTML = '';

  let filteredTasks = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter((task) => !task.isCompleted);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.isCompleted);
  }

  filteredTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksBox.appendChild(taskElement);
  });
  updateTaskCount(tasks);
}

export function clearCompletedTasks() {
  const tasksBox = document.querySelector('.tasks');
  tasksBox.innerHTML = '';
  tasks = tasks.filter((task) => !task.isCompleted);
  savetoLocalStorage('tasks', JSON.stringify(tasks));
  removeCompletedTasks(tasks);
  updateTaskCount(tasks);

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksBox.appendChild(taskElement);
  });
}

export function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.isCompleted = !task.isCompleted;
    savetoLocalStorage('tasks', JSON.stringify(tasks));
    updateTaskCount(tasks);
  }
}

export function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(getFromLocalStorage('tasks')) || [];

  savedTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    document.querySelector('.tasks').appendChild(taskElement);
  });

  tasks = savedTasks;
  updateTaskCount(tasks);
}

export function saveTaskOrder() {
  const tasksBox = document.querySelector('.tasks');
  const taskElements = tasksBox.querySelectorAll('.task');
  const newOrder = Array.from(taskElements).map((taskElement) => {
    const taskId = parseInt(taskElement.getAttribute('data-id'), 10);
    return tasks.find((task) => task.id === taskId);
  });

  tasks = newOrder;
  savetoLocalStorage('tasks', JSON.stringify(tasks));
}
