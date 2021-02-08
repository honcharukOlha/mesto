export const popupOpenPicture = document.querySelector('.popup_open_picture');
export const popupPicture = document.querySelector('.popup__picture');
export const popupDescrition = document.querySelector('.popup__description');
export const containerSelector = '.elements';
export const popupSelector = '.popup';
export const popupCloseButtonSelector = '.popup__close';
export const formSubmit = '.popup__button';

// Откываем попап редактирования профиля
export function showPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    window.addEventListener('keydown', hidePopupByEsc);
}

/* export const hidePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const currentModalWindow = document.querySelector('.popup_opened');
        if (currentModalWindow) {
            hidePopup(currentModalWindow);
        }
    }
} */

// Закрываем попап редактирования профиля
export function hidePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
    window.removeEventListener('keydown', hidePopupByEsc);
}