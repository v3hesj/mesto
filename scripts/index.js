const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileAddElements = profile.querySelector('.profile__button-img');

const popupElementEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupElementEdit.querySelector('.popup__form-edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

const popupElementPhoto = document.querySelector('.popup_type_photo');
const formElementPhoto = popupElementPhoto.querySelector('.popup__form-photo');
const titleInput = formElementPhoto.querySelector('.popup__input_type_title');
const linkInput = formElementPhoto.querySelector('.popup__input_type_link');

const popupElementGallery = document.querySelector('.popup_type_gallery');
const popupGalleryImg = popupElementGallery.querySelector('.popup__gallery-img');
const popupGalleryTitle = popupElementGallery.querySelector('.popup__gallery-title');

const buttonsClose = document.querySelectorAll('.popup__close');

const templateElements = document.querySelector('#element__item').content;
const elementsAll = document.querySelector('.elements');

//--- add elements ------------------------------------------------------------------------------------------------------------------
function createElement (elem) {
  const cardElement = templateElements.querySelector('.element').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.element__img');
  const cardElementTitle = cardElement.querySelector('.element__title');
  cardElementImg.src = elem.link;
  cardElementImg.alt = elem.name;
  cardElementTitle.textContent = elem.name;

  const elementsTrash = cardElement.querySelector('.element__trash');
  elementsTrash.addEventListener('click', deleteCard)

  const elementsLike = cardElement.querySelector('.element__like');
  elementsLike.addEventListener('click', toggleLike);

  cardElementImg.addEventListener('click', function () {
    openPopup(popupElementGallery);
    popupGalleryImg.src = cardElementImg.src;
    popupGalleryImg.alt = cardElementImg.alt;
    popupGalleryTitle.textContent = cardElementTitle.textContent;
  })
  return cardElement;
}

function renderCard (elem) {
  elementsAll.prepend(elem);
}

initialCards.forEach((elem) => {
  elementsAll.append(createElement(elem))
});
//------------------------------------------------------------------------------------------------------------------

//--- open popup ------------------------------------------------------------------------------------------------------------------
profileAddElements.addEventListener('click', function () {
  openPopup(popupElementPhoto);
});

profileEdit.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupElementEdit);
});

function openPopup (elem) {
  elem.classList.add('popup_opened');
}
//------------------------------------------------------------------------------------------------------------------

//--- close popup ------------------------------------------------------------------------------------------------------------------
const buttonCloseMass = Array.from(buttonsClose);
buttonCloseMass.forEach((item) => {
  item.addEventListener('click', function (event) {
    const popupSection = event.target.closest('.popup');
    closePopup(popupSection);
  });
});

function closePopup (elem) {
  elem.classList.remove('popup_opened');
}
//------------------------------------------------------------------------------------------------------------------

//--- Like toggle------------------------------------------------------------------------------------------------------------------
function toggleLike(event) {
  event.target.classList.toggle('element__like_activ');
}
//------------------------------------------------------------------------------------------------------------------

//--- form submit ------------------------------------------------------------------------------------------------------------------
function submitHandleForm (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupElementEdit);
}

formElementEdit.addEventListener('submit', submitHandleForm); 

function submitElementsForm (evt) {
  evt.preventDefault();
  const cardObj = {
    name: titleInput.value,
    link: linkInput.value
  };
  renderCard(createElement(cardObj));
  closePopup(popupElementPhoto);
}

formElementPhoto.addEventListener('submit', submitElementsForm); 
//------------------------------------------------------------------------------------------------------------------

//--- delete element ------------------------------------------------------------------------------------------------------------------
function deleteCard (event) {
  event.target.closest('.element').remove();
}
//------------------------------------------------------------------------------------------------------------------
