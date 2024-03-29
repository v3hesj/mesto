export default class FormValidator {
  constructor (validationConfig, form) {
    this._form = form;

    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners(this._form);
  }

  hideFormValidationErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError (inputElement);
    });
    this._toggleButtonState();
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity (inputElement);
        this._toggleButtonState();
      });
    });
  };

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };
  
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
}