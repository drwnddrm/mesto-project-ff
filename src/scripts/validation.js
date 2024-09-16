const showInputError = (form, input, errorMessage, validationConfig) => {
  const errorSpan = form.querySelector(`.${input.name}-error`);
  const formCloseButton = form.querySelector(validationConfig.submitButtonSelector);

  errorSpan.textContent = errorMessage;
  formCloseButton.disabled = true;

  input.classList.add(validationConfig.inputErrorClass);
  formCloseButton.classList.add(validationConfig.inactiveButtonClass);
  errorSpan.classList.add(validationConfig.errorClass);
}

const hideInputError = (form, input, validationConfig) => {
  const errorSpan = form.querySelector(`.${input.name}-error`);
  const formCloseButton = form.querySelector(validationConfig.submitButtonSelector);

  errorSpan.textContent = "";
  formCloseButton.disabled = false;
  
  input.classList.remove(validationConfig.inputErrorClass);
  formCloseButton.classList.remove(validationConfig.inactiveButtonClass);
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

const toggleButtonState = (inputList, submitButton, validationConfig) => {
  if(hasInvalidData(inputList)) {
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
  }else {
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);  

  console.log(inputList)

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
  const errorSpans = formElement.querySelectorAll(`.${validationConfig.errorClass}`);
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
  })

  errorSpans.forEach((errorSpan) => {
    errorSpan.textContent = ""
  })
}

export { enableValidation, clearValidation };