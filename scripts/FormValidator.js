export default class FormValidator {
    constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, form) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;

        this._form = form;
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState = (formElement, inputList) => {
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);
        if(hasNotValidInput) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(formElement, inputList);
            });
        });
        this._toggleButtonState(formElement, inputList);
    }

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._form));
        formList.forEach(formElement => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    }
}