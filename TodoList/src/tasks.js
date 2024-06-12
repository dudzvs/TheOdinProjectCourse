import { createTaskElement } from './DOM.js';

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

  return taskElement;
}
