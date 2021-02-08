import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector),
            this._popup = popupSelector;
    }

    openImage(image, text) {
        const openImage = document.querySelector('.popup__image');
        const openText = document.querySelector('.popup__text');
        openImage.src = image.src;
        openText.textContent = text.textContent;
        openImage.alt = text.textContent;
        super.open(this._popup);
    }
}