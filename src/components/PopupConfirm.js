import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector('.popup__button');
  }

  setEventListeners () {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._callbackConfirm();
    })
  }

  setContainerCallback (callback) {
    this._callbackConfirm = callback;
  }

  changeButtonText (press) {
    if (press) {
      this._submitButton.textContent = "Удаляю...";
    } else {
      this._submitButton.textContent = "Да";
    }
  }
}