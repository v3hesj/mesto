import '../pages/index.css';

import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js'
import initialCards from '../components/utils/initialCards.js'
import objValid from '../components/utils/validate.js'
import {
  profileAvatar,
  profileAvatarBtn,
  popupSelectorAvatar,
  popupSelectorIdAvatar,
  profileEdit, 
  profileTitle, 
  profileDescription, 
  profileAddElements, 
  formElementEdit, 
  nameInput, 
  jobInput, 
  formElementPhoto, 
  cardTemplateElements,
  popupConfirmSelector
} from '../components/utils/constList.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '569198c1-687c-45d1-b482-1842ebe57de7',
    'Content-Type': 'application/json'
  }
});
let userId;
Promise.all([api.getUserInfo(), api.getInitialCard()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({ userName: user.name, userDescription: user.about });
    userInfo.setUserAvatar({ avatar: user.avatar });
    userId = user._id;
    cardSection.renderItems(cards);
  })
  .catch((err) => { console.log(err)})


const editFormValidator = new FormValidator(objValid, formElementEdit);
const photoFormValidator = new FormValidator(objValid, formElementPhoto);
const avatarFormValidator = new FormValidator(objValid, popupSelectorIdAvatar)

editFormValidator.enableValidation();
photoFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//--- add elements -------------------------------------------------------------------------------------------------

const popupWithImage = new PopupWithImage('#popup_gallery');
popupWithImage.setEventListeners();

const popupConfirm = new PopupConfirm(popupConfirmSelector);
popupConfirm.setEventListeners();

const createCard = (elem) => {
  const card = new Card(elem, cardTemplateElements, userId, { 
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    popupConfirm: () => { 
      popupConfirm.setContainerCallback(() => {
        popupConfirm.changeButtonText(true);
        console.log(elem._id)
        api.deleteCard(elem._id)
        .then(() => {
          card.deleteCard();
          popupConfirm.close();
        })
        .catch((err) => { console.log(err) })
        .finally(() => popupConfirm.changeButtonText(false))
      })
      popupConfirm.open()
    },
    handleLikeClick: () => {
      if (!card.isLiked()) {
        api.addLike(elem._id)
        .then((elem) => {
          card.likeData(elem);
        })
        .catch((err) => { console.log(err) })
      } else {
        api.deleteLike(elem._id)
        .then((elem) => {
          card.likeData(elem);
        })
        .catch((err) => { console.log(err) })
      }
    }
  });
 const cardElement = card.createCardElement();
 return cardElement;
}

const cardSection = new Section({ renderer: (elem) => createCard(elem) }, '.elements');

// cardSection.renderItems();

//--- add class -------------------------------------------------------------------------------------------------
const userInfo = new UserInfo({ nameSelector: profileTitle, descriptionSelector: profileDescription, avatarSelector: '.profile__avatar' });

const popupEditProfile = new PopupWithForm('#popup_edit', ((elem) => {
  popupEditProfile.changeButtonText(true);
  api.updateUserInfo({ name: elem.firstname, about: elem.description })
  .then((user) => {
    userInfo.setUserInfo({ userName: user.name, userDescription: user.about })
    popupEditProfile.close();
  })
  .catch((err) => { console.log(err) })
  .finally(() => popupEditProfile.changeButtonText(false))
}));

popupEditProfile.setEventListeners();

profileEdit.addEventListener('click', function () {
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  editFormValidator.hideFormValidationErrors();
});
//-----------
const popupAddPhoto = new PopupWithForm('#popup_photo', ((elem) => {
  popupAddPhoto.changeButtonText(true);
  api.addNewCard({ name: elem.name, link: elem.link })
  .then((card) => {
    cardSection.addItem(createCard(card)) 
    popupAddPhoto.close();
  })
  .catch((err) => { console.log(err) })
  .finally(() => popupAddPhoto.changeButtonText(false))
}));

popupAddPhoto.setEventListeners();

profileAddElements.addEventListener('click', function () {
  popupAddPhoto.open();
  photoFormValidator.hideFormValidationErrors();
});
//-----------

const popupAvatar = new PopupWithForm(popupSelectorAvatar, ((elem) => {
  popupAvatar.changeButtonText(true);
  api.updateUserAvatar(elem.link)
  .then((ava) => {
    userInfo.setUserAvatar({ avatar: ava.avatar})
    popupAvatar.close();
  })
  .catch((err) => { console.log(err) })
  .finally(() => popupAvatar.changeButtonText(false))
}));

popupAvatar.setEventListeners();

profileAvatarBtn.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.hideFormValidationErrors();
})