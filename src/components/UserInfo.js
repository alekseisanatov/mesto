 export default class UserInfo {
    constructor({name, job}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    setUserInfo(title, subTitle) {
        this._name.textContent = title.value;
        this._job.textContent = subTitle.value;
    }

    getUserInfo() {
        this._dataInfo = {
            nameInfo: this._name.textContent,
            jobInfo: this._job.textContent
        }
        return this._dataInfo;
    }
}