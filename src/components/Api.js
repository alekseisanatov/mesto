export default class Api {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._address}cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this._address}users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    addCard(data) {
        return fetch(`${this._address}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.place,
                link: data.link,
                owner: data._id
            })
        })
            .then(this._checkResponse)
    }

    changeUserInfo(data) {
        return fetch(`${this._address}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
            .then(this._checkResponse)
    }

    changeAvatar(data) {
        return fetch(`${this._address}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }

    likeCard(id) {
        return fetch(`${this._address}cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    unlikeCard(id) {
        return fetch(`${this._address}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._address}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    getAllData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
}