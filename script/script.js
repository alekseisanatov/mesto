let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__descr');

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  let title = document.querySelector('.profile__title');
  let subtitle = document.querySelector('.profile__subtitle');

  title.textContent = nameInputValue;
  subtitle.textContent = jobInputValue;
}

formElement.addEventListener('submit', formSubmitHandler);

popupOpen.addEventListener('click', () => {
  popup.classList.add('popup_active');
});

popupClose.addEventListener('click', () => {
  popup.classList.remove('popup_active');
});