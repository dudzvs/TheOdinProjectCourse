import { validateValues } from './validation';

export function initializeEvents() {
  const form = document.querySelector('form');
  const requiredFields = document.querySelectorAll('[required]');
  const steps = document.querySelectorAll('[data-step]');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  let currentStep = 1;

  function showStep(step) {
    steps.forEach((s) => {
      s.classList.add('hidden');
      if (parseInt(s.dataset.step) === step) {
        s.classList.remove('hidden');
      }
    });

    backBtn.style.opacity = step === 1 ? '0' : '1';
  }
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentStep < steps.length && validateValues(e)) {
      currentStep++;
      showStep(currentStep);
    }
  });

  for (let field of requiredFields) {
    field.addEventListener('invalid', validateValues);
  }
}
