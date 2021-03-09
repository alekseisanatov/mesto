let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');

popupOpen.addEventListener('click', () => {
  popup.style.display = 'block';
});

popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});