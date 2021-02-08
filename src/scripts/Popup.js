import { popupCloseButtonSelector } from "./utils.js";

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = document.querySelector(popupCloseButtonSelector);
        //this._handleEscClose = this._handleEscClose.bind(this);
        //this.close = this.close.bind(this);
        //this.open = this.open.bind(this);

    }

    open() {
        this._popup.classList.add('.popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('.popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', this.close.bind(this));
        //this._popup.addEventListener('click', this.open.bind(this))
        document.addEventListener('keydown', this._handleEscClose);
    }
}