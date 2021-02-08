import { showPopup, popupOpenPicture, popupPicture, popupDescrition, } from './utils.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        // забираем размеку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        // Возвращаем DOM-элемент карточки
        return cardElement;
    }

    _handleLikeEvent(likeButton) {
        likeButton.classList.toggle('element__button_active');
    }

    _handleRemoveEvent(removeButton) {
        removeButton.parentElement.remove();
    }

    _handlePopupEvent() {
        showPopup(popupOpenPicture);
        popupPicture.src = this._link;
        popupPicture.alt = this._name;
        popupDescrition.textContent = this._name;
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector('.element__button');
        likeButton.addEventListener('click', () => {
            this._handleLikeEvent(likeButton);
        });

        const removeButton = this._element.querySelector('.element__basket');
        removeButton.addEventListener('click', () => {
            this._handleRemoveEvent(removeButton);
        });

        const image = this._element.querySelector('.element__image');
        image.addEventListener('click', () => {
            this._handlePopupEvent()
        });


    }

    // Добавляем данные в разметку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const image = this._element.querySelector('.element__image');
        image.src = this._link;
        image.alt = this._link;
        this._element.querySelector('.element__text').textContent = this._name;

        return this._element;
    }

}