import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  popupOpenButton,
  nameInput,
  jobInput,
  popupOpenItem,
  elementsContainer,
  dataSelectors,
  avatarButton,
  avatarInput
} from '../utils/constants.js';
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24/',
  headers: {
    authorization: '0e2b23d6-6e78-49f0-a032-073d66a22f32',
    'Content-type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage('.modal');
const deleteCardPopup = new PopupDeleteCard('.popup-delete');
deleteCardPopup.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__avatar_type_image'
});

popupWithImage.setEventListeners();

function handleCardClick(name, url) {
  popupWithImage.open(name, url);
}

let userId = null;

const createCard = (data) => {
    const card = new Card({
        data: {
            ...data
        },
        handleDeleteIconClick: () => {
            deleteCardPopup.open();
            deleteCardPopup.setSubmitAction(() => {
                deleteCardPopup.showDeletingText(true);
                api.deleteCard(card.getId())
                    .then(_ => {
                        card.deleteCard();
                        deleteCardPopup.close();
                    })
                    .catch((error) => console.log(error))
                    .finally(() => deleteCardPopup.showDeletingText(false))

            })
        },
        handleLike: () => card.handleLikeCard()

    }, '#element', handleCardClick, userId, api);
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
  addCardPopup.showLoading(true);
  api.addCard({
      ...data,
      name: data.place,
      link: data.link,
      owner: userId._id
  })
      .then((data) => {
        cardList.addItem(createCard(data));
        addCardPopup.close();
      })
      .catch((error) => console.log(error))
      .finally(() => addCardPopup.showLoading(false))

}

const editProfilePopup = new PopupWithForm({
  popupSelector: '.profile-popup',
  submitHandler: (data) => {
    profileFormSubmitHandler(data);
  }
});

editProfilePopup.setEventListeners();

function profileFormSubmitHandler (data) {
  editProfilePopup.showLoading(true);
  api.changeUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((error) => console.log(error))
      .finally(() => editProfilePopup.showLoading(false))
}

const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup-avatar',
  submitHandler: (data) => {
    avatarFormSubmitHandler(data);
  }
});

avatarEditPopup.setEventListeners();

function avatarFormSubmitHandler(data) {
  avatarEditPopup.showLoading(true);
  api.changeAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
        avatarEditPopup.close();
      })
      .catch((error) => console.log(error))
      .finally(() => avatarEditPopup.showLoading(false))
}

const cardList = new Section({
      renderer: (item) => {
        elementsContainer.append(createCard(item));
      }
    },
    elementsContainer
)

//Рендерим все карточки и информацию с профиля

api.getAllData()
    .then(([cards, userData]) => {
      userInfo.setUserInfo(userData);
      userId = userData._id;

      cardList.renderItems(cards);
    })
    .catch((error) => console.log(error))

// Валидация всех форм

const avatarFormValidator = new FormValidator(dataSelectors, '.popup-avatar');
avatarFormValidator.enableValidation();

const editFormValidation = new FormValidator(dataSelectors, '.profile-form');
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(dataSelectors, '.popup-item__form');
addFormValidation.enableValidation();

// Слушатели кликов на кнопках попапов

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

avatarButton.addEventListener('click', () => {
  const dataInfo = userInfo.getUserInfo();
  avatarInput.value = dataInfo.avatarInfo;

  avatarEditPopup.open();
  avatarFormValidator.resetValidation();
});


