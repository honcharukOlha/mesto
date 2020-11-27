let profileName = document.querySelector('.profile-info__name');
let profileActivity = document.querySelector('.profile-info__activity');
let nameInput = document.querySelector('.popup__text_name');
let jobInput = document.querySelector('.popup__text_activity');
let popup = document.querySelector('.popup')
let popupForm = document.querySelector('.popup__profile');
let profileInfoButton = document.querySelector('.profile-info__button');
let popupCloseButton = document.querySelector('.popup__button-close');

function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileActivity.textContent;
}

function hidePopup() {
    popup.classList.remove('popup_opened');
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

profileInfoButton.addEventListener("click", showPopup)

popupCloseButton.addEventListener("click", hidePopup)

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);