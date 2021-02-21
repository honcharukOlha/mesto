import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._formSubmitCallback = formSubmitCallback;
        this._submitButton = this._popup.querySelector(".popup__button");
        this._submitMessageDefault = this._submitButton.value;
    }

    _getInputValues() {
        const inputValues = {};
        const inputs = this._popup.querySelectorAll('.popup__text');
        inputs.forEach((input) => {
            inputValues[input.id] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitCallback(this._getInputValues(), this._setLoadingStatus.bind(this));
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    _setLoadingStatus(loadingStatus) {
        if (loadingStatus) {
            this._submitButton.value = 'Сохранение...';
        } else {
            this._submitButton.value = this._submitMessageDefault;
            this.close();
        }
    }
}