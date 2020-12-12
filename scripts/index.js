const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileName = document.querySelector('.profile-info__name');
const profileActivity = document.querySelector('.profile-info__activity');
const nameInput = document.querySelector('.popup__text_name_author');
const jobInput = document.querySelector('.popup__text_name_activity');
const popupOpenEdit = document.querySelector('.popup_open_edit');
const popupForm = document.querySelector('.popup__form_element_edit');
const popupFormAdd = document.querySelector('.popup__form_element_add');
const profileInfoButton = document.querySelector('.profile-info__button');
const popupCloseEdit = document.querySelector('.popup__close_window_edit');
const elementsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.add-button');
const descriptionInput = document.querySelector('.popup__text_name_description');
const linkInput = document.querySelector('.popup__text_name_link');
const popupOpenAdd = document.querySelector('.popup_open_add')
const popupCloseAdd = document.querySelector('.popup__close_window_add');
const popupOpenPicture = document.querySelector('.popup_open_picture');
const popupPicture = document.querySelector('.popup__picture');
const popupDescrition = document.querySelector('.popup__description');
const popupClosePicture = document.querySelector('.popup__close_window_picture');


// Откываем попап редактирования профиля
function showPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
}

// Закрываем попап редактирования профиля
function hidePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока   
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;
    hidePopup(popupOpenEdit);
}

function addCardSubmitHandler(evt) {
    evt.preventDefault();
    const cardElement = createCard(descriptionInput.value, linkInput.value);
    addCard(elementsContainer, cardElement);
    hidePopup(popupOpenAdd);
    popupFormAdd.reset();
}

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const elementCard = cardTemplate.cloneNode(true);
    const likeButton = elementCard.querySelector('.element__button');
    const removeButton = elementCard.querySelector('.element__basket');
    const image = elementCard.querySelector('.element__image');

    image.src = link;
    image.alt = name;
    elementCard.querySelector('.element__text').textContent = name;
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__button_active')
    });
    removeButton.addEventListener('click', function() {
        removeButton.parentElement.remove();
    });
    image.addEventListener('click', function() {
        showPopup(popupOpenPicture);
        popupPicture.src = link;
        popupPicture.alt = name;
        popupDescrition.textContent = name;
    });
    return elementCard;
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

profileInfoButton.addEventListener("click", function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileActivity.textContent;
    showPopup(popupOpenEdit)
});

popupCloseEdit.addEventListener("click", function() {
    hidePopup(popupOpenEdit);
});

addButton.addEventListener("click", function() {
    showPopup(popupOpenAdd);
});

popupCloseAdd.addEventListener("click", function() {
    hidePopup(popupOpenAdd);
    popupFormAdd.reset();
});

popupClosePicture.addEventListener("click", function() {
    hidePopup(popupOpenPicture);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);

popupFormAdd.addEventListener('submit', addCardSubmitHandler);

initialCards.forEach(function(card) {
    const cardElement = createCard(card.name, card.link);
    addCard(elementsContainer, cardElement);
});