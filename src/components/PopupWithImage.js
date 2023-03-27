import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupGalleryImg = this._popupSelector.querySelector('.popup__gallery-img');
    this._popupGalleryTitle = this._popupSelector.querySelector('.popup__gallery-title');
  }

  open(name,link) {
    this._popupGalleryImg.src = link;
    this._popupGalleryImg.alt = name;
    this._popupGalleryTitle.textContent = name;
    super.open();
  }
}