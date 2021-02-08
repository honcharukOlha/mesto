import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './consts.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const validationConfig = {
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__text_invalid',
    errorClass: 'popup__text-error_active'
};

const cardTemplate = "#card-template";

const nameInput = document.querySelector('.popup__text_name_author');
const jobInput = document.querySelector('.popup__text_name_activity');

const profileInfoButton = document.querySelector('.profile-info__button');
const addButton = document.querySelector('.add-button');

const profileFormValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_element_edit'));
const cardFormValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_element_add'));




const userInfo = new UserInfo({
    profileNameSelector: ".profile-info__name",
    profileJobSelector: ".profile-info__activity"
});

const popupImage = new PopupWithImage(".popup_open_picture");
popupImage.setEventListeners();

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplate, popupImage.open.bind(popupImage));
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);

    }
}, '.elements');
cardList.renderItems();



const profileForm = new PopupWithForm(
    ".popup_open_edit",
    function(inputValues) {
        const data = {
            profileName: inputValues['text-input-author'],
            profileJob: inputValues['text-input-activity']
        }
        userInfo.setUserInfo(data);
    });
profileForm.setEventListeners();

const cardForm = new PopupWithForm(
    ".popup_open_add",
    function(inputValues) {
        const data = {
            name: inputValues['text-input-description'],
            link: inputValues['url-input-link']
        }
        const card = new Card(data, cardTemplate, popupImage.open.bind(popupImage));
        cardList.addItem(card.generateCard());
    });
cardForm.setEventListeners();


profileInfoButton.addEventListener("click", function() {
    const data = userInfo.getUserInfo();

    nameInput.value = data.profileName;
    jobInput.value = data.profileJob;
    profileForm.open();
});

addButton.addEventListener("click", function() {
    cardForm.open();
});

const modalWindows = document.querySelectorAll('.popup');
modalWindows.forEach((modalWindow) => {
    modalWindow.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup')) {
            popupImage.close();
            profileForm.close();
            cardForm.close();
        }
    });
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();