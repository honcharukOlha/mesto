// Находим форму в DOM
let popupOpened = document.querySelector('.popup_opened');
let popupContainer = popupOpened.querySelector('.popup__container');
let formElement = popupContainer.querySelector('.popup__profile');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__name');
    // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector('.popup__activity');
    // Воспользуйтесь инструментом .querySelector()

    console.log(nameInput.value, jobInput.value);

    // Получите значение полей из свойства value
    paragraph.textContent = nameInput.value;
    paragraph.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    let paragraph = document.querySelector('.popup__name');
    console.log(paragraph.textContent);
    paragraph.textContent = 'ФИО деятеля';

    let paragraph = document.querySelector('.popup__activity');
    console.log(paragraph.textContent);
    paragraph.textContent = 'Род деятельности';

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);