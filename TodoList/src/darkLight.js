import { savetoLocalStorage, getFromLocalStorage } from './localStorage';

export function switcherDarkLightMode() {
  const switcher = document.getElementById('switcher');

  const savedMode = getFromLocalStorage('mode');
  if (savedMode) {
    document.documentElement.dataset.mode = savedMode;
  }

  switcher.addEventListener('change', () => {
    const currentMode = document.documentElement.dataset.mode;
    const newMode = currentMode === 'Dark' ? 'Light' : 'Dark';
    document.documentElement.dataset.mode = newMode;
    savetoLocalStorage('mode', newMode);
  });
}
