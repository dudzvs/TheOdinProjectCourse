import './style.css';
import { switcherDarkLightMode } from './darkLight';
import { addTask, addTaskEventListeners } from './events';
import { loadTasksFromLocalStorage } from './tasks';

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  switcherDarkLightMode();
  addTaskEventListeners();
  addTask();
});
