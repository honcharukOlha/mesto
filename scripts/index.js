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

let profileName = document.querySelector('.profile-info__name');
let profileActivity = document.querySelector('.profile-info__activity');
let nameInput = document.querySelector('.popup__text_name_author');
let jobInput = document.querySelector('.popup__text_name_activity');
let popupOpenEdit = document.querySelector('.popup_open_edit')
let popupForm = document.querySelector('.popup__form_element_edit');
let popupFormAdd = document.querySelector('.popup__form_element_add');
let profileInfoButton = document.querySelector('.profile-info__button');
let popupCloseEdit = document.querySelector('.popup__close_window_edit');
let elementsContainer = document.querySelector('.elements');
let addButton = document.querySelector('.add-button');
let descriptionInput = document.querySelector('.popup__text_name_description');
let linkInput = document.querySelector('.popup__text_name_link');
let popupOpenAdd = document.querySelector('.popup_open_add')
let popupCloseAdd = document.querySelector('.popup__close_window_add');
let popupOpenPicture = document.querySelector('.popup_open_picture');
let popupPicture = document.querySelector('.popup__picture');
let popupDescrition = document.querySelector('.popup__description');
let popupClosePicture = document.querySelector('.popup__close_window_picture');


// Откываем попап редактирования профиля
function showPopup() {
    popupOpenEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileActivity.textContent;
}

// Закрываем попап редактирования профиля
function hidePopup() {
    popupOpenEdit.classList.remove('popup_opened');
    nameInput.value = "";
    jobInput.value = "";
}

// Обработчик «отправки» формы, хотя пока   
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;
    hidePopup()
}

function addCardSubmitHandler(evt) {
    evt.preventDefault();
    addCard(linkInput.value, descriptionInput.value);
    linkInput.value = "";
    descriptionInput = "";
    hideAddCardPopup()
}

profileInfoButton.addEventListener("click", showPopup);

popupCloseEdit.addEventListener("click", hidePopup);


// Создаем новые карточки в HTML
function addCard(imageValue, textValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const elementCard = cardTemplate.cloneNode(true);
    const likeButton = elementCard.querySelector('.element__button');
    const removeButton = elementCard.querySelector('.element__basket');
    const image = elementCard.querySelector('.element__image');

    image.src = imageValue;
    elementCard.querySelector('.element__text').textContent = textValue;
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__button_active')
    });
    removeButton.addEventListener('click', function() {
        removeButton.parentElement.remove();
    });
    image.addEventListener('click', function() {
        showPicturePopup(imageValue, textValue);
    });
    elementsContainer.prepend(elementCard);
}

initialCards.forEach(function(card) {
    addCard(card.link, card.name)
});

// Открываем попап добавления карточки
function showAddCardPopup() {
    popupOpenAdd.classList.add('popup_opened');
    descriptionInput.placeholder;
    linkInput.placeholder;
}

// Закрываем попап добавления карточки
function hideAddCardPopup() {
    popupOpenAdd.classList.remove('popup_opened');
    descriptionInput.placeholder = "";
    linkInput.placeholder = "";
}

function showPicturePopup(image, title) {
    popupOpenPicture.classList.add('popup_opened');
    popupPicture.src = image;
    popupDescrition.textContent = title;
}

function hidePicturePopup() {
    popupOpenPicture.classList.remove('popup_opened');
}

addButton.addEventListener("click", showAddCardPopup);

popupCloseAdd.addEventListener("click", hideAddCardPopup);

popupClosePicture.addEventListener("click", hidePicturePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);

popupFormAdd.addEventListener('submit', addCardSubmitHandler);