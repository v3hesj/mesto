export default class Card {
  constructor (element, cardTemplateElements, cardClick) {
    this._name = element.name;
    this._link = element.link;
    this._templateElem = cardTemplateElements;
    // this._openPopupGallery = openPopupGallery;
    this._handleCardClick = cardClick.handleCardClick;
  }

  _setEventListener () {
    // this._cardElementImg.querySelector('.element__img');
    // this._cardElementImg.addEventListener('click', () => {
    //   this._openPopupGallery(this);
    // });

    this._cardElementImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._elementsLike = this._cardElement.querySelector('.element__like');
    this._elementsLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._elementsTrash = this._cardElement.querySelector('.element__trash');
    this._elementsTrash.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _toggleLike() {
    this._elementsLike.classList.toggle('element__like_activ');
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateElem)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCardElement () {
    this._cardElement = this._getTemplate();
    this._cardElementImg = this._cardElement.querySelector('.element__img');
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    
    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;
    this._cardElementTitle.textContent = this._name;

    this._setEventListener();

    return this._cardElement;
  }
}