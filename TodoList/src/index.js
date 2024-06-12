import './style.css';
import { switcherDarkLightMode } from './darkLight';
import { addTask } from './events';

window.addEventListener('load', () => {
  switcherDarkLightMode();
  addTask();
});
