export class Card {
    constructor(
        data,
        cardSelector,
        handleCardClick,
        handleDelete,
        deleteConfirm,
        handleLikeClick
    ) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._isOwn = data.isOwnCard;
        this._id = data.id;
        this._userId = data.currentUserId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._deleteConfirm = deleteConfirm;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        // забираем размеку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        // Возвращаем DOM-элемент карточки
        return cardElement;
    }

    _isLikedAlready() {
        const result = this._likes.find((element, index, a) => {
            return element._id == this._userId;
        });
        return result != undefined;
    }

    _refreshLikeButtonState() {
        if (this._isLikedAlready()) {
            this._likeButton.classList.add('element__button_active');
        } else {
            this._likeButton.classList.remove('element__button_active');
        }
    }

    _handleLikeEvent() {
        this._handleLikeClick(!this._isLikedAlready(), this._id)
            .then((res) => {
                this._likes = res.likes;
                this._refreshLikeButtonState();
                this._likeCounter.textContent = this._likes.length;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    _handleDeletePromise(removeButton) {
        return this._handleDelete(this._id)
            .then((res) => {
                removeButton.parentElement.remove();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    _handleRemoveEvent(removeButton) {
        this._deleteConfirm(() => {
            this._handleDeletePromise(removeButton);
        });
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeEvent();
        });

        const removeButton = this._element.querySelector('.element__basket');
        removeButton.addEventListener('click', () => {
            this._handleRemoveEvent(removeButton);
        });
        let removeButtonVisibility = 'hidden';
        if (this._isOwn) {
            removeButtonVisibility = 'visible';
        }
        removeButton.style.visibility = removeButtonVisibility;

        const image = this._element.querySelector('.element__image');
        image.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }

    // Добавляем данные в разметку
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__button');
        this._likeCounter = this._element.querySelector('.element__like');
        this._setEventListeners();
        const image = this._element.querySelector('.element__image');
        image.src = this._link;
        image.alt = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._likeCounter.textContent = this._likes.length;
        this._refreshLikeButtonState();
        return this._element;
    }
}