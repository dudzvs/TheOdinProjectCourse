import { handleDragEnd, handleDragOver, handleDragStart } from './DOM.js';
import {
  createNewTask,
  deleteTask,
  filterTasks,
  toggleTaskCompletion,
  clearCompletedTasks,
} from './tasks.js';

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
  const filterBtns = document.querySelectorAll('a');
  const taskElements = document.querySelectorAll('.task');

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const taskElement = e.target.closest('.task');
      const taskId = parseInt(taskElement.dataset.id, 10);
      deleteTask(taskId);
      taskElement.remove();
    } else if (e.target.classList.contains('clear-all')) {
      clearCompletedTasks();
    }
  });

  taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('todo-check')) {
      const taskElement = e.target.closest('.task');
      const taskId = parseInt(taskElement.dataset.id, 10);
      toggleTaskCompletion(taskId);
    }
  });

  filterBtns.forEach((filter) => {
    filter.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = e.target.getAttribute('href').substring(1);
      filterBtns.forEach((btn) => btn.classList.remove('active'));

      e.target.classList.add('active');
      filterTasks(filter);
    });
  });

  taskElements.forEach((task) => {
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragend', handleDragEnd);
  });

  taskList.addEventListener('dragover', (e) => handleDragOver(e, taskList));
}
