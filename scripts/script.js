const popup = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
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
const modalImage = document.querySelector('.modal');
const modalImageClose = document.querySelector('.modal__close');
const modalImagePicture = document.querySelector('.modal__img');
const modalImageCaption = document.querySelector('.modal__figcaption');
const elementsContainer = document.querySelector('.elements__grid');
const elementTemplate = document.querySelector('#element').content.querySelector('.element');
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

function createCard(str, img) {
  const elementList = elementTemplate.cloneNode(true);
  const elementListTitle = elementList.querySelector('.element__title');
  const elementListImage = elementList.querySelector('.element__image');
  const elementListButtonLike = elementList.querySelector('.element__like');
  const elementListButtonRemove = elementList.querySelector('.element__trash');

  elementListButtonLike.addEventListener('click', (e)=> {
    e.target.classList.toggle('element__like_active');
  });

  elementListButtonRemove.addEventListener('click', ()=> {
    elementList.remove();
  });

  elementListImage.addEventListener('click', ()=> {
    modalImage.classList.add('modal_active');
    modalImageCaption.textContent = str;
    modalImagePicture.src = img;
    modalImagePicture.alt = str;
  });

  modalImageClose.addEventListener('click', ()=> {
    modalImage.classList.remove('modal_active');
  });

  elementListTitle.textContent = str;
  elementListImage.style.backgroundImage = 'url(' + img + ')';

  return elementList;
}

function insertCard(str, img, container) {
  container.prepend(createCard(str, img));
}


function modalClose(popupElement) {
  popupElement.classList.remove('popup_active');
}

function modalOpen(popupElement) {
  popupElement.classList.add('popup_active');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  modalClose(popup);
}

function itemFormSubmitHandler (evt) {
  evt.preventDefault();
  // createCard(placeInput.value, linkInput.value);
  insertCard(placeInput.value, linkInput.value, elementsContainer);

  modalClose(popupItem);
  placeInput.value = '';
  linkInput.value = '';

}

for (let i = 0; i < initialCards.length; i++) {
  insertCard(initialCards[i].name, initialCards[i].link, elementsContainer);
}

popupOpenItem.addEventListener('click', ()=> {
  modalOpen(popupItem);
});

popupCloseItem.addEventListener('click', ()=> {
  modalClose(popupItem);
});

formItemElement.addEventListener('submit', itemFormSubmitHandler);

formElement.addEventListener('submit', formSubmitHandler);

popupClose.addEventListener('click', ()=> {
  modalClose(popup);
});

popupOpen.addEventListener('click', () => {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  modalOpen(popup);
});

