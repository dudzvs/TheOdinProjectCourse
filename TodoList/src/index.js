import './style.css';
import { switcherDarkLightMode } from './darkLight';
import { addTask, addTaskEventListeners } from './events';
import { loadTasksFromLocalStorage } from './tasks';

window.addEventListener('load', () => {
  loadTasksFromLocalStorage();
  switcherDarkLightMode();
  addTaskEventListeners();
  addTask();
});
