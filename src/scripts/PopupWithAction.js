import { Popup } from './Popup.js';

export class PopupWithAction extends Popup {
    constructor(popupSelector, actionButtonSelector) {
        super(popupSelector);
        this._actionButton = this._popup.querySelector(actionButtonSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._actionButton.addEventListener('click', (evt) => {
            this._onActionClick();
            this.close();
        })
    }

    onActionRequest(action) {
        this.open();
        this._onActionClick = action;
    }
}