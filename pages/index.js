let profile = document.querySelector('.profile');
let profileEdit = profile.querySelector('.profile__edit');
let profileTitle = profile.querySelector('.profile__title');
let profileDescription = profile.querySelector('.profile__description');

let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__conteiner');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');
let buttonAdd = formElement.querySelector('.popup__button');
let buttonClose = formElement.querySelector('.popup__close');

profileEdit.addEventListener('click', openPopup);

function openPopup () {
  popupElement.classList.add('popup_opened');
  nameInput.setAttribute('placeholder', profileTitle.textContent)
  jobInput.setAttribute('placeholder', profileDescription.textContent)
}

buttonClose.addEventListener('click', closePopup);

function closePopup () {
  popupElement.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 