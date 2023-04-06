export default class Card {
  constructor (element, cardTemplateElements, userId, cardClick) {
    this._name = element.name;
    this._link = element.link;
    this._id = element._id;
    this._likes = element.likes;
    this._templateElem = cardTemplateElements;
    this._userId = userId;
    this._ownerId = element.owner._id;
    // this._openPopupGallery = openPopupGallery;
    this._handleCardClick = cardClick.handleCardClick;
    this._deleteCardClick = cardClick.popupConfirm;
    this._handleLikeClick = cardClick.handleLikeClick;
  }

  _setEventListener () {
    this._cardElementImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._elementLike.addEventListener('click', () => this._handleLikeClick());
    // this._elementsLike = this._cardElement.querySelector('.element__like');
    // this._elementsLike.addEventListener('click', () => {
    //   this._toggleLike();
    // });
        
    this._elementsTrash.addEventListener('click', () => this._deleteCardClick());

    // this._elementsTrash = this._cardElement.querySelector('.element__trash');
    // this._elementsTrash.addEventListener('click', () => {
    //   this._deleteCard();
    // });
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like_activ');
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  likeData (data) {
    this._likes = data.likes;
    this._elementCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._toggleLike();
    } else {
      this._toggleLike();
    }
    // this._toggleLike();
  }

  deleteCard() {
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

    this._elementsTrash = this._cardElement.querySelector('.element__trash');

    if (this._ownerId != this._userId) {
      this._elementsTrash.classList.add('element__trash_hidden');
    }

    this._elementLike = this._cardElement.querySelector('.element__like');
    this._elementCounter = this._cardElement.querySelector('.element__counter');
    this._elementCounter.textContent = this._likes.length;
    // console.log(this._elementCounter, this._likes.length);
    if (this.isLiked()) {
      this._elementLike.classList.add('element__like_activ');
    }

    this._setEventListener();

    return this._cardElement;
  }
}