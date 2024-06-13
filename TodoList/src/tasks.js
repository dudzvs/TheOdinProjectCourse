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

export function filterTasks(filter) {
  const tasksBox = document.querySelector('.tasks');
  tasksBox.innerHTML = ''; // Limpa a lista atual de tarefas

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
}

export function toggleTaskCompletion(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
  }

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
