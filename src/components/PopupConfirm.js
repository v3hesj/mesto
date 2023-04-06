import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector('.popup__button');
  }

  setEventListeners () {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._callbackConfirm();
    })
  }

  containerCallback (callback) {
    this._callbackConfirm = callback;
  }

  buttonUX (press) {
    if (press) {
      this._submitButton.textContent = "Удаляю...";
    } else {
      this._submitButton.textContent = "Да";
    }
  }
}