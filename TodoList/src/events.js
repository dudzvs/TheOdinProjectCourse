import { createNewTask } from './tasks.js';

export function addTask() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputTask = document.getElementById('newTaskInput');
    createNewTask(inputTask.value);
    inputTask.value = '';
  });
}
