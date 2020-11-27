let profileName = document.querySelector('.profile-info__name');
let profileActivity = document.querySelector('.profile-info__activity');
let popupName = document.querySelector('.popup__text_name');
let popupActivity = document.querySelector('.popup__text_activity');
let nameInput = document.querySelector('.popup__text_name');
let jobInput = document.querySelector('.popup__text_activity');

function handlePopupEvent(showPopup) {
    let popup = document.querySelector('.popup');
    if (showPopup) {
        // показываем попап
        popup.classList.add('popup_opened');
        popupName.placeholder = profileName.textContent;
        popupActivity.placeholder = profileActivity.textContent;
    } else {
        // закрываем попап
        popup.classList.remove('popup_opened');
        nameInput.value = "";
        jobInput.value = "";
    }
}

// Находим кнопку открытия попапа
let profileInfoButton = document.querySelector('.profile-info__button');
profileInfoButton.addEventListener("click", function() {
    handlePopupEvent(true)
})

// Находим кнопку закрытия попапа
let popupCloseButton = document.querySelector('.popup__button-close');
popupCloseButton.addEventListener("click", function() {
    handlePopupEvent(false)
})

// Находим форму попапа
let popupForm = document.querySelector('.popup__profile');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    handlePopupEvent(false)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);