import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const validationConfig = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__text_invalid',
    errorClass: 'popup__text-error_active'
};

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
export const popupOpenPicture = document.querySelector('.popup_open_picture');
export const popupPicture = document.querySelector('.popup__picture');
export const popupDescrition = document.querySelector('.popup__description');
const popupClosePicture = document.querySelector('.popup__close_window_picture');
const cardTemplateSelector = '#card-template';
const forms = document.querySelectorAll('.popup__form');

const hidePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const currentModalWindow = document.querySelector('.popup_opened');
        if (currentModalWindow) {
            hidePopup(currentModalWindow);
        }
    }
}

// Откываем попап редактирования профиля
export function showPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    window.addEventListener('keydown', hidePopupByEsc);
}

// Закрываем попап редактирования профиля
function hidePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    window.removeEventListener('keydown', hidePopupByEsc);
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

// Отработка события создания карточки
function addCardSubmitHandler(evt) {
    evt.preventDefault();
    const cardData = { name: descriptionInput.value, link: linkInput.value };
    const cardElement = new Card(cardData, cardTemplateSelector).generateCard();
    addCard(elementsContainer, cardElement);
    hidePopup(popupOpenAdd);
    popupFormAdd.reset();
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

// Создаем карточки всех элементов массива 
initialCards.forEach((item) => {
    // Создаем карточку
    const card = new Card(item, cardTemplateSelector);
    const cardElement = card.generateCard()
        // Добавляем в DOM
    addCard(elementsContainer, cardElement);
});

const modalWindows = document.querySelectorAll('.popup');
modalWindows.forEach((modalWindow) => {
    modalWindow.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup')) {
            hidePopup(modalWindow);
        }
    });
});

forms.forEach((form) => {
    new FormValidator(validationConfig, form).enableValidation();
});