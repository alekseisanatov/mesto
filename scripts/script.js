import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const formItemElement = document.querySelector('.popup-item__form');
const nameInput = document.querySelector('.popup__text_input_name');
const jobInput = document.querySelector('.popup__text_input_descr');
const placeInput = document.querySelector('.popup__text_input_place');
const linkInput = document.querySelector('.popup__text_input_link');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupItem = document.querySelector('.popup-item');
const popupOpenItem = document.querySelector('.profile__add-button');
const popupCloseItem = document.querySelector('.popup-item__close');
export const modalImage = document.querySelector('.modal');
export const modalImageClose = document.querySelector('.modal__close');
export const modalImagePicture = document.querySelector('.modal__img');
export const modalImageCaption = document.querySelector('.modal__figcaption');
const elementsContainer = document.querySelector('.elements__grid');
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

initialCards.forEach(item => {
  const card = new Card(item.name, item.link, '#element');
  elementsContainer.append(card.renderCard());
});

const editFormValidation = new FormValidator({
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__form-error_active'
}, '.popup__form');
editFormValidation.enableValidation();

const addFormValidation = new FormValidator({
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__form-error_active'
}, '.popup-item__form');
addFormValidation.enableValidation();


function insertCard(name, link, container) {
  const card = new Card(name, link, '#element');
  container.prepend(card.renderCard());
}

function popupOpen(popupElement) {
  popupElement.classList.add('popup_active');
}

function popupClose(popupElement) {
  popupElement.classList.remove('popup_active');
}

export function modalClose(modalElement) {
  modalElement.classList.remove('modal_active');
}

export function modalOpen(modalElement) {
  modalElement.classList.add('modal_active');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  popupClose(popup);
}

function itemFormSubmitHandler (evt) {
  evt.preventDefault();
  insertCard(placeInput.value, linkInput.value, elementsContainer);

  popupClose(popupItem);
  placeInput.value = '';
  linkInput.value = '';
}

function closePopupOnEscape (evt) {
  if(evt.key === 'Escape') {
    if(popup.classList.contains('popup_active')) {
      popupClose(popup);
    }
    if(popupItem.classList.contains('popup_active')) {
      popupClose(popupItem);
    }
  }
}

function closePopupOnOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    popupClose(popup);
  }
  if(evt.target.classList.contains('popup-item')) {
    popupClose(popupItem);
  }
}

function eventListenerOnEscape() {
  const activePopup = document.querySelector('.popup_active');
  if (activePopup) {
    document.addEventListener('keydown', closePopupOnEscape);
  } else {
    document.removeEventListener('keydown', closePopupOnEscape);
  }
}

popupOpenItem.addEventListener('click', ()=> {
  popupOpen(popupItem);
});

popupCloseItem.addEventListener('click', ()=> {
  popupClose(popupItem);
});

formItemElement.addEventListener('submit', itemFormSubmitHandler);

formElement.addEventListener('submit', formSubmitHandler);

popupCloseButton.addEventListener('click', ()=> {
  popupClose(popup);
});

popupOpenButton.addEventListener('click', () => {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popupOpen(popup);
});

popup.addEventListener('click', closePopupOnOverlay);
popupItem.addEventListener('click', closePopupOnOverlay);
document.addEventListener('click', eventListenerOnEscape);

