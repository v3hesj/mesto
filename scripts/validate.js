const objValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// enableValidation(objValid);

// function enableValidation (objValid) {
//   const formList = Array.from(document.querySelectorAll(`${objValid.formSelector}`));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement,objValid);
//   });
// };

// function hideFormValidationErrors(formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(`${objValid.inputSelector}`));
//   const buttonElement = formElement.querySelector(`${objValid.submitButtonSelector}`);
//   inputList.forEach((inputElement) => {
//     hideInputError (formElement, inputElement, objValid);
//   });
//   toggleButtonState(inputList, buttonElement, objValid);
// };

// function setEventListeners (formElement, objValid) {
//   const inputList = Array.from(formElement.querySelectorAll(`${objValid.inputSelector}`));
//   const buttonElement = formElement.querySelector(`${objValid.submitButtonSelector}`);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, objValid);
//       toggleButtonState(inputList, buttonElement, objValid);
//     });
//   });

//   formElement.addEventListener('reset', () => {
//     setTimeout(() => {
//       toggleButtonState(inputList, buttonElement, objValid);
//     }, 0);
//   });
// };

// function checkInputValidity (formElement, inputElement, objValid) {
//   if (!inputElement.validity.valid) {
//      showInputError(formElement, inputElement, inputElement.validationMessage, objValid);
//   } else {
//      hideInputError(formElement, inputElement, objValid);
//   }
// };

// function showInputError (formElement, inputElement, errorMessage, objValid) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(`${objValid.inputErrorClass}`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(`${objValid.errorClass}`);
// };

// function hideInputError (formElement, inputElement, objValid) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(`${objValid.inputErrorClass}`);
//   errorElement.classList.remove(`${objValid.errorClass}`);
//   errorElement.textContent = '';
// };

// function toggleButtonState (inputList, buttonElement, objValid) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(`${objValid.inactiveButtonClass}`);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(`${objValid.inactiveButtonClass}`);
//   }
// };

// function hasInvalidInput (inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }; 