export class UserInfo {
    constructor(data) {
        this._nameElement = document.querySelector(data.profileNameSelector);
        this._jobElement = document.querySelector(data.profileJobSelector);
    }

    getUserInfo() {
        return {
            profileName: this._nameElement.textContent,
            profileJob: this._jobElement.textContent,
        };
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.profileName;
        this._jobElement.textContent = data.profileJob;
    }
}