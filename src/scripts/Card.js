export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        // забираем размеку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        // Возвращаем DOM-элемент карточки
        return cardElement;
    }

    _handleLikeEvent(likeButton) {
        likeButton.classList.toggle("element__button_active");
    }

    _handleRemoveEvent(removeButton) {
        removeButton.parentElement.remove();
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector(".element__button");
        likeButton.addEventListener("click", () => {
            this._handleLikeEvent(likeButton);
        });

        const removeButton = this._element.querySelector(".element__basket");
        removeButton.addEventListener("click", () => {
            this._handleRemoveEvent(removeButton);
        });

        const image = this._element.querySelector(".element__image");
        image.addEventListener("click", () => {
            this._handleCardClick(this._link, this._name);
        });
    }

    // Добавляем данные в разметку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const image = this._element.querySelector(".element__image");
        image.src = this._link;
        image.alt = this._link;
        this._element.querySelector(".element__text").textContent = this._name;
        this._element.querySelector(".element__like").textContent = this._likes;
        return this._element;
    }
}