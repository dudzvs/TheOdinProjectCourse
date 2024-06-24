import { validateValues } from './validation';

export function initializeEvents() {
  const form = document.querySelector('form');
  const requiredFields = document.querySelectorAll('[required]');
  const steps = document.querySelectorAll('[data-step]');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const navBtns = document.querySelectorAll('[data-nav-button]');
  let currentStep = 1;
  let currentCircle = 0;

  function showStep(step) {
    steps.forEach((s) => {
      s.classList.add('hidden');
      if (parseInt(s.dataset.step) === step) {
        s.classList.remove('hidden');
      }
    });

    backBtn.style.opacity = step === 1 ? '0' : '1';
  }

  function updateStep(direction) {
    if (direction === 'next') {
      if (currentStep < steps.length && validateValues()) {
        currentStep++;
        currentCircle++;
      }
    } else if (direction === 'back') {
      if (currentStep <= steps.length && currentStep !== 1) {
        currentStep--;
        currentCircle--;
      }
    }
    showStep(currentStep);
    navBtns.forEach((btn, index) => {
      btn.classList.toggle('active', index === currentCircle);
    });
  }

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateStep('next');
  });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateStep('back');
  });

  for (let field of requiredFields) {
    field.addEventListener('invalid', validateValues);
  }
}
