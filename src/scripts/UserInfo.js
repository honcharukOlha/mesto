export class UserInfo {
    conctructor(data) {
        this._nameInput = data.profileName;
        this._jobInput = data.profileActivity;
    }

    getUserInfo() {
        return {
            profileName: this._nameInput,
            profileActivity: this._jobInput
        }
    }

    setUserInfo() {
        profileName.textContent = this._nameInput;
        profileActivity.textContent = this._jobInput;
    }
}