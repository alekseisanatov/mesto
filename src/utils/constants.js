export {
    popupOpenButton,
    nameInput,
    jobInput,
    popupOpenItem,
    elementsContainer,
    dataSelectors,
    avatarButton,
    avatarInput
};

const popupOpenButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__text_input_name');
const jobInput = document.querySelector('.popup__text_input_descr');
const avatarInput = document.querySelector('.popup__text_input_avatar')
const popupOpenItem = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__grid');
const avatarButton = document.querySelector('.profile__avatar_type_button');
const dataSelectors = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__form_type_error',
    errorClass: 'popup__form-error_active'
}