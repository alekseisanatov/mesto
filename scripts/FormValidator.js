export default class FormValidator {
    constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, form) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;

        this._form = form;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = document.querySelector(this._form).querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = document.querySelector(this._form).querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState = (inputList) => {
        const buttonElement = document.querySelector(this._form).querySelector(this._submitButtonSelector);
        const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);
        if(hasNotValidInput) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners = () => {
        const inputList = Array.from(document.querySelector(this._form).querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, inputElement);
            });
            this._toggleButtonState(inputList, inputElement);
        });
    }

    enableValidation = () => {
        document.querySelector(this._form).addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}