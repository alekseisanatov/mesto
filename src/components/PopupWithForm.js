import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitHandler}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__text')];
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
           values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners () {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
        super.setEventListeners();
    }

    close = () => {
        this._form.reset();
        super.close();
    }
}