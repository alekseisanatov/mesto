export default class Card {
    constructor({data, handleDeleteIconClick, handleLike, currentUser}, template, handleCardClick,userId, api) {
        this._element = document.querySelector(template).content.children[0].cloneNode(true);
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._likesCounter = data.likes;
        this._api = api;

        this.handleCardClick = handleCardClick;
        this.handleDeleteIconClick = handleDeleteIconClick;
        this._cardTitle = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__trash');
        this._cardImage = this._element.querySelector('.element__image');
        this._likeCounter = this._element.querySelector('.element__like_type_counter');
    }

    getId() {
        return this._id;
    }

    deleteCard = () => {
        this._element.remove();

        this._element = null;
    }

    handleLikeCard = () => {
        if(this._likeButton.classList.contains('element__like_active')) {
            this._api.unlikeCard(this._id)
                .then((data) => {
                    this._likeButton.classList.remove('element__like_active');
                    this._likeCounter.textContent = data.likes.length;
                })
                .catch((error) => console.log(error))
        } else {
            this._api.likeCard(this._id)
                .then((data) => {
                    this._likeButton.classList.add('element__like_active');
                    this._likeCounter.textContent = data.likes.length;
                })
                .catch((error) => console.log(error))
        }
    }

    _setEventListener = () => {
        this._likeButton.addEventListener('click', () => {
            this.handleLikeCard(this);
        });
        this._deleteButton.addEventListener('click', () => {
            this.handleDeleteIconClick(this);
        });
        this._cardImage.addEventListener('click', () => {
            this.handleCardClick(this._name, this._link)
        });
    }

    renderCard = () => {
        this._cardTitle.textContent = this._name;
        this._cardImage.style.backgroundImage = 'url(' + this._link + ')';
        this._likeCounter.textContent = this._likesCounter.length;

        if(this._likesCounter.find((obj) => this._userId === obj._id)) {
            this._likeButton.classList.add('element__like_active')
        }

        if(this._ownerId === this._userId) {
            this._deleteButton.classList.remove('element__trash_hidden');
        }


        this._setEventListener();
        return this._element;
    }
}