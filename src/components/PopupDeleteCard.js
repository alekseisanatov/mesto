import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupSaveButton = this._popupForm.querySelector('.popup__button');
        this._popupSaveButtonDefault = this._popupSaveButton.textContent;
    }

    setSubmitAction(action) {
        this._submitFunc = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunc();
        })
    }

    showDeletingText(isDeleting) {
        if(isDeleting) {
            this._popupSaveButton.textContent = 'Удаление...'
        } else {
            this._popupSaveButton.textContent = this._popupSaveButtonDefault;
        }
    }
}