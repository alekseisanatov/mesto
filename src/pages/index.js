import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
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
} from '../utils/constants.js';
import Section from "../components/Section.js";

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
  submitHandler: (data) => {
    profileFormSubmitHandler(data);
  }
});

editProfilePopup.setEventListeners();

function profileFormSubmitHandler () {
  userInfo.setUserInfo(nameInput, jobInput);
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
});

popupOpenButton.addEventListener('click', () => {
  const dataInfo = userInfo.getUserInfo();
  nameInput.value = dataInfo.nameInfo;
  jobInput.value = dataInfo.jobInfo;

  editProfilePopup.open();
  editFormValidation.resetValidation();
});


