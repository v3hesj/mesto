import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;

    this._formPopup = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._sendButton = this._popupElement.querySelector('.popup__button');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._formPopup.reset();
    super.close();
  }
}