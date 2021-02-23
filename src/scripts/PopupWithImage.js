import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._openImage = document.querySelector('.popup__picture');
        this._openText = document.querySelector('.popup__description');
    }
    open(image, text) {
        this._openImage.src = image;
        this._openText.textContent = text;
        this._openImage.alt = text;
        super.open();
    }
}