let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_name');
let jobInput = document.querySelector('.popup__text_descr');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

function modalClose() {
  popup.classList.remove('popup_active');
}

function modalOpen() {
  popup.classList.add('popup_active');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  modalClose();
}

formElement.addEventListener('submit', formSubmitHandler);

popupClose.addEventListener('click', () => {
  modalClose();
});

popupOpen.addEventListener('click', () => {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  modalOpen();
});



