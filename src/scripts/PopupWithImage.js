import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

    open(image, text) {
        const openImage = document.querySelector('.popup__picture');
        const openText = document.querySelector('.popup__description');
        openImage.src = image;
        openText.textContent = text;
        openImage.alt = text;
        super.open();
    }
}