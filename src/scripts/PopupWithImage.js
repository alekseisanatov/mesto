import Popup from './Popup.js';

 export default class PopupWithImage  extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._modalCaption = this._popupSelector.querySelector('.modal__figcaption');
        this._modalImage = this._popupSelector.querySelector('.modal__img');
    }

    open(name, link) {
        super.open();
        this._modalCaption.textContent = name;
        this._modalImage.src = link;
        this._modalImage.alt = name;
    }

}