import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, submitFormSelector) {
        super(popupSelector);
        this._submitForm = this._popup.querySelector('.popup__form');
    }

    getSubmitConfirmation(callback) {
        super.open();
        this._submitForm.removeEventListener('submit', this._lastSubmitListener);
        this._lastSubmitListener = (evt) => {
            evt.preventDefault();
            callback();
            super.close();
        };
        this._submitForm.addEventListener('submit', this._lastSubmitListener);
    }
}