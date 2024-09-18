const showInputError = (form, input, errorMessage, validationConfig) => {
  const errorSpan = form.querySelector(`.${input.name}-error`);
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  errorSpan.textContent = errorMessage;
  
  disableButton(submitButton, validationConfig)

  input.classList.add(validationConfig.inputErrorClass);
  errorSpan.classList.add(validationConfig.errorClass);
}

const hideInputError = (form, input, validationConfig) => {
  const errorSpan = form.querySelector(`.${input.name}-error`);

  errorSpan.textContent = "";
  
  input.classList.remove(validationConfig.inputErrorClass);
  errorSpan.classList.remove(validationConfig.errorClass);
}

const isValid = (formElement, inputElement, validationConfig) => {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.pattern);
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig)
  } else {
    inputElement.setCustomValidity("")
    hideInputError(formElement, inputElement, validationConfig)
  }
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig)
  } else {
    hideInputError(formElement, inputElement, validationConfig)
  }
}

const hasInvalidData = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function disableButton(submitButton, validationConfig) {
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
}

const toggleButtonState = (inputList, submitButton, validationConfig) => {
  if(hasInvalidData(inputList)) {
    disableButton(submitButton, validationConfig)
  }else {
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);  
  
  disableButton(submitButton, validationConfig)
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      toggleButtonState(inputList, submitButton, validationConfig);
      isValid(formElement, evt.target, validationConfig)
    })
  })
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  })
}

function clearValidation(formElement, validationConfig) {
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  disableButton(submitButton, validationConfig)

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig)
  })
}

export { enableValidation, clearValidation };