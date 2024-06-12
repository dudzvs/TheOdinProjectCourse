import './style.css';
import { switcherDarkLightMode } from './darkLight';
import { addTask } from './events';
import { loadTasksFromLocalStorage } from './tasks';

window.addEventListener('load', () => {
  loadTasksFromLocalStorage();
  switcherDarkLightMode();
  addTask();
});
