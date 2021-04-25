import {modalOpen, modalClose, modalImage, modalImagePicture, modalImageCaption, modalImageClose} from "./script.js";

export default class Card {
    static selectors = {
        templateTitle: '.element__title',
        templateImage: '.element__image',
        templateLike: '.element__like',
        templateClose: '.element__trash',
        modalCloseButton: '.modal__close'
    }

    constructor(name, url, template) {
        this._element = document.querySelector(template).content.children[0].cloneNode(true);

        this._name = name;
        this._url = url;

        this._element.querySelector(Card.selectors.templateTitle).textContent = name;
        this._element.querySelector(Card.selectors.templateImage).style.backgroundImage = 'url(' + url + ')';


        this._element.querySelector(Card.selectors.templateImage).addEventListener('click', this._openImageModal);
        this._element.querySelector(Card.selectors.templateLike).addEventListener('click', this._likeCard);
        this._element.querySelector(Card.selectors.templateClose).addEventListener('click', this._deleteCard);
    }

    _openImageModal = () => {
        modalOpen(modalImage);
        modalImageCaption.textContent = this._name;
        modalImagePicture.src = this._url;
        modalImagePicture.alt = this._name;

        modalImage.querySelector(Card.selectors.modalCloseButton).addEventListener('click', this._closeImageModal);
        modalImage.addEventListener('click', this._closeImageModalOnOverlay);
        document.addEventListener('keydown', this._closeImageModalOnEscape);
    }

    _closeImageModal = () => {
        modalClose(modalImage);
        modalImage.querySelector(Card.selectors.modalCloseButton).removeEventListener('click', this._closeImageModal);
    }

    _closeImageModalOnOverlay(evt) {
        if(evt.target.classList.contains('modal')) {
            modalClose(modalImage);
            modalImage.removeEventListener('click', this._closeImageModalOnOverlay);
        }
    }

    _closeImageModalOnEscape = (evt) => {
        if(evt.key === 'Escape') {
            modalClose(modalImage);
            document.removeEventListener('keydown', this._closeImageModalOnEscape);
        }
    }

    _deleteCard = () => {
        this._element.remove();
    }

    _likeCard = () => {
        this._element.querySelector(Card.selectors.templateLike).classList.toggle('element__like_active');
    }

    renderCard = () => {
        return this._element;
    }
}