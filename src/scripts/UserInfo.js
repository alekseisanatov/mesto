 export default class UserInfo {
    constructor({name, job}) {
        this._title = document.querySelector('.popup__text_input_name');
        this._subtitle = document.querySelector('.popup__text_input_descr');
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    setUserInfo() {
        this._name.textContent = this._title.value;
        this._job.textContent = this._subtitle.value;
    }

    getUserInfo() {
        this._dataInfo = {
            nameInfo: this._name.textContent,
            jobInfo: this._job.textContent
        }
        return this._dataInfo;
    }
}