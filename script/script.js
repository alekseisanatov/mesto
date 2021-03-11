let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');


popupOpen.addEventListener('click', () => {
  popup.style.display = 'block';
});

popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});


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