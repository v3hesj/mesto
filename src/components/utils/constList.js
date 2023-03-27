const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = '.profile__title';
const profileDescription = '.profile__description';
const profileAddElements = profile.querySelector('.profile__button-img');
const popupElementEdit = document.querySelector('.popup_type_edit');
const formElementEdit = popupElementEdit.querySelector('#popup__form-edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
const popupElementPhoto = document.querySelector('.popup_type_photo');
const formElementPhoto = popupElementPhoto.querySelector('#popup__form-photo');
const cardTemplateElements = '#element__item';

export {
  profileEdit, 
  profileTitle, 
  profileDescription, 
  profileAddElements, 
  formElementEdit, 
  nameInput, 
  jobInput, 
  formElementPhoto, 
  cardTemplateElements
}