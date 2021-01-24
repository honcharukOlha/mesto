import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { showPopup, popupOpenPicture, hidePopup } from './utils.js';
import { initialCards } from './consts.js';

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
const popupFormValidator = new FormValidator(validationConfig, popupForm);
const popupFormAdd = document.querySelector('.popup__form_element_add');
const popupFormAddValidator = new FormValidator(validationConfig, popupFormAdd);
const profileInfoButton = document.querySelector('.profile-info__button');
const popupCloseEdit = document.querySelector('.popup__close_window_edit');
const elementsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.add-button');
const descriptionInput = document.querySelector('.popup__text_name_description');
const linkInput = document.querySelector('.popup__text_name_link');
const popupOpenAdd = document.querySelector('.popup_open_add')
const popupCloseAdd = document.querySelector('.popup__close_window_add');
const popupClosePicture = document.querySelector('.popup__close_window_picture');
const cardTemplateSelector = '#card-template';
const forms = document.querySelectorAll('.popup__form');


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
    const cardElement = createCard(descriptionInput.value, linkInput.value);
    addCard(elementsContainer, cardElement);
    hidePopup(popupOpenAdd);
    popupFormAdd.reset();
}

function createCard(name, link) {
    const cardData = { name: name, link: link };
    return new Card(cardData, cardTemplateSelector).generateCard();
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
    const cardElement = createCard(item.name, item.link);
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

popupFormValidator.enableValidation();
popupFormAddValidator.enableValidation();