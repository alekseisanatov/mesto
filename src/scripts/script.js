import '../pages/index.css';
import Card from './Card.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from './PopupWithForm.js';
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import {
  popupOpenButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  popupOpenItem,
  elementsContainer,
  initialCards,
  dataSelectors,
} from './constants.js';
import Section from "./Section.js";

const popupWithImage = new PopupWithImage('.modal');

const userInfo = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle'
});

popupWithImage.setEventListeners();

function handleCardClick(name, url) {
  popupWithImage.open(name, url);
}

function createCard(name, link) {
  const card = new Card(name, link, '#element', handleCardClick);
  return card.renderCard();
}

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup-item',
  submitHandler: (data) => {
    itemFormSubmitHandler(data);
  }
});

addCardPopup.setEventListeners();

function itemFormSubmitHandler (data)  {
  cardList.addItem(createCard(data.place, data.link));
  addCardPopup.close();
}

const editProfilePopup = new PopupWithForm({
  popupSelector: '.profile-popup',
  submitHandler: () => {
    profileFormSubmitHandler();
  }
});

editProfilePopup.setEventListeners();

function profileFormSubmitHandler () {
  userInfo.setUserInfo();
  editProfilePopup.close();
}

const cardList = new Section({
      items: initialCards,
      renderer: (cardItem) => {
        elementsContainer.append(createCard(cardItem.name, cardItem.link));
      }
    },
    elementsContainer
)

cardList.renderItems();

const editFormValidation = new FormValidator(dataSelectors, '.profile-form');
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(dataSelectors, '.popup-item__form');
addFormValidation.enableValidation();

popupOpenItem.addEventListener('click', ()=> {
  addCardPopup.open();
  addFormValidation.resetValidation();
  placeInput.value = '';
  linkInput.value = '';
});

popupOpenButton.addEventListener('click', () => {
  const dataInfo = userInfo.getUserInfo();
  nameInput.value = dataInfo.nameInfo;
  jobInput.value = dataInfo.jobInfo;

  editProfilePopup.open();
  editFormValidation.resetValidation();
});


