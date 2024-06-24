export function validateValues(e) {
  e.preventDefault();
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const phoneInput = document.getElementById('phone');

  const isNameValid = validateField(
    nameInput,
    'This field is required',
    (value) => value.trim() !== ''
  );
  const isEmailPresent = validateField(
    emailInput,
    'This field is required',
    (value) => value.trim() !== ''
  );
  const isEmailValid = validateField(
    emailInput,
    'Type a valid Email',
    (value) => validEmail(value.trim())
  );
  const isPhoneValid = validateField(
    phoneInput,
    'This field is required',
    (value) => value.trim() !== ''
  );

  return isNameValid && isEmailPresent && isEmailValid && isPhoneValid;
}

function validateField(input, errorMessage, validationFn) {
  if (!validationFn(input.value)) {
    setError(input, errorMessage);
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

function setSuccess(input) {
  input.classList.remove('invalid');
  const errorEl = input.nextElementSibling;
  if (errorEl) {
    errorEl.innerText = '';
  }
}

function setError(input, message) {
  const errorEl = input.nextElementSibling;
  input.classList.add('invalid');
  if (errorEl) {
    errorEl.innerText = message;
  }
}

function validEmail(emailValue) {
  const res =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return res.test(String(emailValue).toLowerCase());
}
