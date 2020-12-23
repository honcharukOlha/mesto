const showInputError = (popupForm, inputElement, errorMessage) => {
    const errorElement = popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__text_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__text-error_active');
};

const hideInputError = (popupForm, inputElement) => {
    const errorElement = popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__text_type_error');
    errorElement.classList.remove('popup__text-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (popupForm, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(popupForm, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(popupForm, inputElement);
    }
};

const setEventListeners = (popupForm) => {
    const inputList = Array.from(popupForm.querySelectorAll('.popup__text'));
    const buttonElement = popupForm.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(popupForm, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((popupForm) => {
        popupForm.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(popupForm.querySelectorAll('.popup__set'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.classList.remove('popup__button_inactive');
    }
}

enableValidation();