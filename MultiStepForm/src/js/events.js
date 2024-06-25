import { showStep, updateStepContent, updateSummary } from './DOM';
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

  updateStepContent(currentStep);
  function updateStep(direction) {
    if (direction === 'next') {
      if (currentStep < steps.length && validateValues()) {
        currentStep++;
        currentCircle++;
        showStep(steps, currentStep, backBtn, nextBtn);
      }
    } else if (direction === 'back') {
      if (currentStep <= steps.length && currentStep !== 1) {
        currentStep--;
        currentCircle--;
        showStep(steps, currentStep, backBtn, nextBtn);
      }
    }
    updateStepContent(currentStep);
    updateSummary();
    navBtns.forEach((btn, index) => {
      btn.classList.toggle('active', index === currentCircle);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateStep('next');
    nextBtn.classList.remove('hidden');

    if (currentStep === steps.length) {
      nextBtn.classList.add('hidden');
    }
  });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateStep('back');

    if (currentStep < steps.length) {
      nextBtn.classList.remove('hidden');
    }
  });

  for (let field of requiredFields) {
    field.addEventListener('invalid', (e) => {
      e.preventDefault();
      validateValues();
    });
  }
}
