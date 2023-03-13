import Card from './Card.js'
import FormValidator from './FormValidator.js'

const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileAddElements = profile.querySelector('.profile__button-img');

const popupElementEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupElementEdit.querySelector('#popup__form-edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

const popupElementPhoto = document.querySelector('.popup_type_photo');
const formElementPhoto = popupElementPhoto.querySelector('#popup__form-photo');
const titleInput = formElementPhoto.querySelector('.popup__input_type_title');
const linkInput = formElementPhoto.querySelector('.popup__input_type_link');

const popupElementGallery = document.querySelector('.popup_type_gallery');
const popupGalleryImg = popupElementGallery.querySelector('.popup__gallery-img');
const popupGalleryTitle = popupElementGallery.querySelector('.popup__gallery-title');

const buttonsClose = document.querySelectorAll('.popup__close');
const overlayClose = document.querySelectorAll('.popup');

// const templateElements = document.querySelector('#element__item').content;
const cardTemplateElements = '#element__item';
const elementsAll = document.querySelector('.elements');

const editFormValidator = new FormValidator(objValid, formElementEdit);
const photoFormValidator = new FormValidator(objValid, formElementPhoto);

editFormValidator.enableValidation();
photoFormValidator.enableValidation();
//--- add elements -------------------------------------------------------------------------------------------------
const createCard = (elem) => {
 const card = new Card(elem, cardTemplateElements, openPopupGallery);
 const cardElement = card.createCardElement();
 return cardElement;
}

initialCards.forEach((elem) => {
  elementsAll.append(createCard(elem))
});

function renderCard (elem) {
  elementsAll.prepend(createCard(elem));
}
//------------------------------------------------------------------------------------------------------------------

//--- open popup ---------------------------------------------------------------------------------------------------
function openPopupGallery (elem) {
  openPopup(popupElementGallery);
  popupGalleryImg.src = elem._link;
  popupGalleryImg.alt = elem._name;
  popupGalleryTitle.textContent = elem._name;
}

profileAddElements.addEventListener('click', function () {
  formElementPhoto.reset();

  openPopup(popupElementPhoto);
  photoFormValidator._hideFormValidationErrors();
});

profileEdit.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupElementEdit);
  // hideFormValidationErrors(formElementEdit);
  editFormValidator._hideFormValidationErrors();
});

function openPopup (elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeyEscPopup);
}
//------------------------------------------------------------------------------------------------------------------

//--- close popup --------------------------------------------------------------------------------------------------
const buttonCloseMass = Array.from(buttonsClose);
buttonCloseMass.forEach((item) => {
  item.addEventListener('click', function (event) {
    const popupSection = event.target.closest('.popup');
    closePopup(popupSection);
  });
});

const overlayCloseMass = Array.from(overlayClose);
overlayCloseMass.forEach((item) => {
  item.addEventListener('mousedown', function (event) {
    if(event.target.classList.contains('popup')) {
      closePopup(event.target);
    }
  });
});

//--- close func --------------------------------------------------------------------------------------------------
function closePopup (elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeyEscPopup);
}
//------------------------------------------------------------------------------------------------------------------

//--- close Escape--------------------------------------------------------------------------------------------------
function closeKeyEscPopup(event) {
  if(event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};
//------------------------------------------------------------------------------------------------------------------

//--- form submit --------------------------------------------------------------------------------------------------
function submitProfileForm (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupElementEdit);
  // hideFormValidationErrors(popupElementEdit)
  editFormValidator._hideFormValidationErrors();
}

formElementEdit.addEventListener('submit', submitProfileForm); 

function submitElementsForm (evt) {
  evt.preventDefault();
  const cardObj = {
    name: titleInput.value,
    link: linkInput.value
  };
  renderCard(cardObj);
  closePopup(popupElementPhoto);
  photoFormValidator._hideFormValidationErrors();
}

formElementPhoto.addEventListener('submit', submitElementsForm); 
