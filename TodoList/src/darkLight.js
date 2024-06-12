export function switcherDarkLightMode() {
  const switcher = document.getElementById('switcher');

  switcher.addEventListener('change', () => {
    const currentMode = document.documentElement.dataset.mode;
    document.documentElement.dataset.mode =
      currentMode === 'Dark' ? 'Light' : 'Dark';
  });
}
