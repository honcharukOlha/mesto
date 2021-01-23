export class FormValidator {
    constructor(validationConfig, form) {
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._form = form;
    };

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    };

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _setButtonState() {
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        const isActive = this._form.checkValidity()
        if (isActive) {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.disabled = false;
        } else {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
        }
    }

    _setEventListeners() {
        const inputsList = this._form.querySelectorAll(this._inputSelector);

        inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState();
            });
        });
    }


    // Включаем валидацию
    enableValidation() {
        this._setEventListeners();
        this._setButtonState();
    }
}