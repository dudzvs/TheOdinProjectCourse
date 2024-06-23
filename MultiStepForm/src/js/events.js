import { validateValues } from './validation';

export function initializeEvents() {
  const form = document.querySelector('form');
  const requiredFields = document.querySelectorAll('[required]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateValues(e);
  });

  for (let field of requiredFields) {
    field.addEventListener('invalid', validateValues);
  }
}
