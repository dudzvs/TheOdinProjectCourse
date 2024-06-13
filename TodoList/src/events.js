import { createNewTask, deleteTask, toggleTaskCompletion } from './tasks.js';

export function addTask() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputTask = document.getElementById('newTaskInput');
    createNewTask(inputTask.value);
    inputTask.value = '';
  });
}

export function addTaskEventListeners() {
  const taskList = document.querySelector('.tasks');

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const taskElement = e.target.closest('.task');
      const taskId = parseInt(taskElement.dataset.id, 10);
      deleteTask(taskId);
      taskElement.remove();
    }
  });
}
