import '../pages/index.css';

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import initialCards from '../components/utils/initialCards.js'
import objValid from '../components/utils/validate.js'
import {
  profileEdit, 
  profileTitle, 
  profileDescription, 
  profileAddElements, 
  formElementEdit, 
  nameInput, 
  jobInput, 
  formElementPhoto, 
  cardTemplateElements
} from '../components/utils/constList.js'

const editFormValidator = new FormValidator(objValid, formElementEdit);
const photoFormValidator = new FormValidator(objValid, formElementPhoto);

editFormValidator.enableValidation();
photoFormValidator.enableValidation();

//--- add elements -------------------------------------------------------------------------------------------------

const popupWithImage = new PopupWithImage('#popup_gallery');
popupWithImage.setEventListeners();

const createCard = (elem) => {
 const card = new Card(elem, cardTemplateElements,{ handleCardClick: (name, link) => {
  popupWithImage.open(name, link);
 }});
 const cardElement = card.createCardElement();
 return cardElement;
}

const cardSection = new Section({items: initialCards, renderer: (elem) => createCard(elem)}, '.elements');

cardSection.renderItems();

//--- add class -------------------------------------------------------------------------------------------------
const userInfo = new UserInfo({ nameSelector: profileTitle, descriptionSelector: profileDescription });

const popupEditProfile = new PopupWithForm('#popup_edit', ((elem) => { userInfo.setUserInfo({ userName: elem.firstname, userDescription: elem.description })}));
popupEditProfile.setEventListeners();

profileEdit.addEventListener('click', function () {
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  editFormValidator._hideFormValidationErrors();
});

const popupAddPhoto = new PopupWithForm('#popup_photo', ((elem) => { cardSection.addItem(createCard(elem)) }));
popupAddPhoto.setEventListeners();

profileAddElements.addEventListener('click', function () {
  formElementPhoto.reset();
  popupAddPhoto.open();
  photoFormValidator._hideFormValidationErrors();
});