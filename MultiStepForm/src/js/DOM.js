export function updateStepContent(step) {
  const stepTitle = document.getElementById('titleForm');
  const stepDescription = document.getElementById('descriptForm');

  switch (step) {
    case 1:
      stepTitle.textContent = 'Personal info';
      stepDescription.textContent =
        'Please provide your name, email address, and phone number.';
      break;
    case 2:
      stepTitle.textContent = 'Select plan';
      stepDescription.textContent = 'Choose a plan that best suits your needs.';
      break;
    case 3:
      stepTitle.textContent = 'Add-ons';
      stepDescription.textContent =
        "Select any additional services or features you'd like to add.";
      break;
    case 4:
      stepTitle.textContent = 'Summary';
      stepDescription.textContent =
        'Review your selections before completing the form.';
      break;
    case 5:
      stepTitle.innerHTML = '';
      stepDescription.innerHTML = '';
      break;
    default:
      break;
  }
}

export function updateSummary() {
  const selectedPlanInput = document.querySelector(
    "input[name='plansInput']:checked"
  );
  const selectedPlan = selectedPlanInput.nextElementSibling.querySelector(
    '.plan-detail span:first-child'
  ).textContent;
  const selectedPlanValue = parseFloat(
    selectedPlanInput.nextElementSibling
      .querySelector('.plan-detail span:last-child')
      .textContent.replace('$', '')
  );

  const selectedBilling = document.querySelector(
    "input[name='billing']:checked"
  ).id;

  const addons = Array.from(
    document.querySelectorAll("input[name='mods']:checked")
  ).map((addon) => {
    const addonName = addon.nextElementSibling.querySelector(
      '.plan-detail span:first-child'
    ).textContent;
    const addonPrice = parseFloat(
      addon.nextElementSibling
        .querySelector('.price')
        .textContent.replace('+$', '')
    );
    return { name: addonName, price: addonPrice };
  });

  const selectedPlanElement = document.querySelector('.selected-plan');
  selectedPlanElement.querySelector(
    'span'
  ).textContent = `${selectedPlan} (${selectedBilling})`;
  selectedPlanElement.querySelector(
    'span:last-child'
  ).textContent = `$${selectedPlanValue}/mo`;

  const addonsContainer = document.querySelector('.addons');
  addonsContainer.innerHTML = '';

  addons.forEach((addon) => {
    const addonElement = document.createElement('div');
    addonElement.className = 'addon';
    addonElement.innerHTML = `
          <span>${addon.name}</span>
          <span>+$${addon.price}/yr</span>
      `;
    addonsContainer.appendChild(addonElement);
  });

  const totalElement = document.querySelector('.total span:last-child');
  const total = addons.reduce(
    (acc, addon) => acc + addon.price,
    selectedPlanValue
  );
  totalElement.textContent = `$${total}/yr`;
}

export function showStep(steps, step, backBtn, nextBtn) {
  steps.forEach((s) => {
    s.classList.add('hidden');
    if (parseInt(s.dataset.step) === step) {
      s.classList.remove('hidden');
    }
  });

  backBtn.style.opacity = step === 1 ? '0' : '1';
  nextBtn.innerText = step === 4 ? 'Submit' : 'Next Step';
}
