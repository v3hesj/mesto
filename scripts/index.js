let profile = document.querySelector('.profile');
let profileEdit = profile.querySelector('.profile__edit');
let profileTitle = profile.querySelector('.profile__title');
let profileDescription = profile.querySelector('.profile__description');
let profileAddElements = profile.querySelector('.profile__button-img');

let popupElementEdit = document.querySelector('.popup_type_edit');
let formElementEdit = popupElementEdit.querySelector('.popup__form-edit');
let nameInput = formElementEdit.querySelector('.popup__input_type_name');
let jobInput = formElementEdit.querySelector('.popup__input_type_description');

let popupElementPhoto = document.querySelector('.popup_type_photo');
let formElementPhoto = popupElementPhoto.querySelector('.popup__form-photo');
let titleInput = formElementPhoto.querySelector('.popup__input_type_title');
let linkInput = formElementPhoto.querySelector('.popup__input_type_link');

let popupElementGallery = document.querySelector('.popup_type_gallery');
let popupGalleryImg = popupElementGallery.querySelector('.popup__gallery-img');
let popupGalleryTitle = popupElementGallery.querySelector('.popup__gallery-title');

let buttonClose = document.querySelectorAll('.popup__close');

let templateElements = document.querySelector('#element__item').content;
let elementsAll = document.querySelector('.elements');

//--- add elements ------------------------------------------------------------------------------------------------------------------
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function elementsDraw (elem) {
  let elementsItem = templateElements.querySelector('.elements__item').cloneNode(true);
  elementsItem.querySelector('.elements__img').src = elem.link;
  elementsItem.querySelector('.elements__title').textContent = elem.name;
  elementsItem.querySelector('.elements__img').alt = elem.name;
  elementsAll.prepend(elementsItem);
  elementsDelete (elementsItem);
  elementsLike (elementsItem);
  elementsImage(elementsItem);
}
for (let i = initialCards.length-1; i >= 0; i--) {
  elementsDraw(initialCards[i]);
}
//------------------------------------------------------------------------------------------------------------------

//--- open popup ------------------------------------------------------------------------------------------------------------------
profileAddElements.addEventListener('click', function () {
  openPopup(popupElementPhoto);
});

profileEdit.addEventListener('click', function () {
  openPopup(popupElementEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

function elementsImage (item) {
  let elementGallImages = item.querySelector('.elements__img');
  let elementGallTitle = item.querySelector('.elements__title');

  elementGallImages.addEventListener('click', function () {
    openPopup(popupElementGallery);
    popupGalleryImg.src = elementGallImages.src;
    popupGalleryTitle.textContent = elementGallTitle.textContent;
  });
}

function openPopup (elem) {
  elem.classList.add('popup_opened');
}
//------------------------------------------------------------------------------------------------------------------

//--- close popup ------------------------------------------------------------------------------------------------------------------
let buttonCloseMass = Array.from(buttonClose);
buttonCloseMass.forEach((item) => {
  item.addEventListener('click', closePopup);
});

function closePopup () {
  popupElementEdit.classList.remove('popup_opened');
  popupElementPhoto.classList.remove('popup_opened');
  popupElementGallery.classList.remove('popup_opened');
}
//------------------------------------------------------------------------------------------------------------------

//--- Like ------------------------------------------------------------------------------------------------------------------
function elementsLike (item) {
  let elementsLike = item.querySelector('.elements__like');
  elementsLike.addEventListener('click', function () {
    console.log('toggle like');
    elementsLike.classList.toggle('elements__like_activ');
  })
}
//------------------------------------------------------------------------------------------------------------------

//--- form submit ------------------------------------------------------------------------------------------------------------------
function handleFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElementEdit.addEventListener('submit', handleFormSubmit); 

function elementsFormSubmit (evt) {
  evt.preventDefault();
  let cardObj = {
    name: `${titleInput.value}`,
    link: `${linkInput.value}`
  };
  initialCards.unshift(cardObj);
  elementsDraw (initialCards[0]);
  closePopup();
}

formElementPhoto.addEventListener('submit', elementsFormSubmit); 
//------------------------------------------------------------------------------------------------------------------

//--- delete element ------------------------------------------------------------------------------------------------------------------
function elementsDelete (item) {
  let elementsTrash = item.querySelector('.elements__trash');
  elementsTrash.addEventListener('click', function () {
    item.remove();
  })
}
//------------------------------------------------------------------------------------------------------------------
