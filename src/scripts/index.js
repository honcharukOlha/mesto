import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./consts.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./Api.js";

const validationConfig = {
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__text_invalid",
    errorClass: "popup__text-error_active",
};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '21eee041-fcae-490d-9803-798f90444675',
        'Content-Type': 'application/json'
    }
})

const cardTemplate = "#card-template";
const nameInput = document.querySelector(".popup__text_name_author");
const jobInput = document.querySelector(".popup__text_name_activity");
const profileInfoButton = document.querySelector(".profile-info__button");
const addButton = document.querySelector(".add-button");
const profileAvatar = document.querySelector(".profile__avatar");

const profileFormValidator = new FormValidator(
    validationConfig,
    document.querySelector(".popup__form_element_edit")
);

const cardFormValidator = new FormValidator(
    validationConfig,
    document.querySelector(".popup__form_element_add")
);

const userInfo = new UserInfo({
    profileNameSelector: ".profile-info__name",
    profileJobSelector: ".profile-info__activity",
});

const popupImage = new PopupWithImage(".popup_open_picture");
popupImage.setEventListeners();

const cardList = new Section({
        items: [],
        renderer: (item) => {},
    },
    ".elements"
);

const profileForm = new PopupWithForm(
    ".popup_open_edit",
    function(inputValues) {
        const data = {
            profileName: inputValues["text-input-author"],
            profileJob: inputValues["text-input-activity"],
        };
        api.setUserInfo(data.profileName, data.profileJob).then((res) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
);
profileForm.setEventListeners();

const cardDeletePopup = new PopupWithAction(".popup_open_confirmation", ".popup__button_confirmation")

const cardForm = new PopupWithForm(".popup_open_add", function(inputValues) {
    const data = {
        name: inputValues["text-input-description"],
        link: inputValues["url-input-link"],
    };
    api.addNewCard(data.name, data.link).then((res) => {
        const resData = {
            name: res.name,
            link: res.link,
            likes: res.likes.length
        }
        const card = new Card(resData, cardTemplate, popupImage.open.bind(popupImage));
        cardList.addItem(card.generateCard());
    })

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

const modalWindows = document.querySelectorAll(".popup");
modalWindows.forEach((modalWindow) => {
    modalWindow.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup")) {
            popupImage.close();
            profileForm.close();
            cardForm.close();
        }
    });
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

api.getUserInfo().then((res) => {
        const data = {
            profileName: res.name,
            profileJob: res.about,
        }
        userInfo.setUserInfo(data);
        profileAvatar.src = res.avatar;
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards().then((res) => {
        res.forEach((res) => {
            const resData = {
                name: res.name,
                link: res.link,
                likes: res.likes.length
            }
            const cardElement = new Card(resData, cardTemplate, popupImage.open.bind(popupImage));
            cardList.addItem(cardElement.generateCard());
        })
    })
    .catch((err) => {
        console.log(err);
    });