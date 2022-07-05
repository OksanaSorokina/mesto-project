
const popupProfile = document.querySelector('#popup-profile');
const btnPopupClose = popupProfile.querySelector('.popup__close');
const popupName = popupProfile.querySelector('#popup-name');
const popupDescription = popupProfile.querySelector('#popup-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupButton = document.querySelector('.popup__button');
const popupForm = popupProfile.querySelector('.popup__form');
const cardElements = document.querySelectorAll('.element'); //в cardElements будет лежать массив

const imageClose = document.querySelector('#image-close');
const popupImage = document.querySelector('#popup-big-image');
const popupPicture = popupImage.querySelector('.popup-image__picture');
const popupCaption = popupImage.querySelector('.popup-image__caption');

// открываю поп-ап редактирования профиля
const btnPopupOpen = document.querySelector('.profile__edit-button');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

btnPopupOpen.addEventListener('click', function(evn) {
    openPopup(popupProfile);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
})


// закрываю поп-ап редактирования профиля
btnPopupClose.addEventListener('click', function (evn) {
    closePopup(popupProfile);
})


// редактирую профиль: ищу на основной странице элементы, которые должны быть заменены и в поп-апе, ищу кнопку Сохранить и подменяю содержимое
popupForm.addEventListener('submit', function(evn) {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    
    // Предыдущая страница по умолчанию  - стандартное событие. Мы велим не возвращать предыдущую страницу после отправки:
    evn.preventDefault();
    closePopup(popupProfile);
})


//добавление карточек на сайт
const popupCard = document.querySelector('#popup-card');
const btnPopupCardClose = popupCard.querySelector('.popup__close');
const popupFormCard = popupCard.querySelector('.popup__form');
const popupNameCard = popupCard.querySelector('#popup-name-card');
const popupImageCard = popupCard.querySelector('#popup-image');

const profileButton = document.querySelector('.profile__button');
const cardTemplate = document.querySelector('#card-template');

const elements = document.querySelector('.elements');


//открываю поп-ап создания карточки
profileButton.addEventListener('click', function(evn) {
    openPopup(popupCard);
    
    popupNameCard.value = '';
    popupImageCard.value = '';
    
})

//закрываю поп-ап создания карточки
btnPopupCardClose.addEventListener('click', function (evn) {
    closePopup(popupCard);
})


// функция, которая удаляет элемент со страницы (её мы вызываем два раза - 
//для карточек, которые  на странице при загрузке сайта и для новых карточек)
function removeCard(evn) {
    const localTrash = evn.target;
    const localCard = localTrash.parentElement;
    localCard.remove();
}

// функция, которая сохраняет/удаляет, т.е. переключает(toggle) лайки
function addLike(evn) {
    const localLike = evn.target;
    localLike.classList.toggle('element__like_active');
}

//функция, которая открывает поп-ап просмотра картинки
function showImage(evn) {
    const link = evn.target.getAttribute('src');
    popupPicture.setAttribute('src', link);
    const title = evn.target.parentElement.querySelector('.element__title');
    popupCaption.textContent = title.textContent;
    openPopup(popupImage);
}


function createCard(descr, img) {
    const templateContent = cardTemplate.content;
    const newCard = templateContent.querySelector('.element').cloneNode(true);       
        
    const elementImage = newCard.querySelector('.element__image');
    const elementTitle = newCard.querySelector('.element__title');

    elementTitle.textContent = descr;
    elementImage.setAttribute('src', img);
    elementImage.setAttribute('alt', 'фото ' + descr);

   
    // вешаем слушателя на кнопку удаления
    const localTrash = newCard.querySelector('.element__trash');
    localTrash.addEventListener('click', removeCard);   

    //вешаю слушателя на кнопку лайка
    const localLike = newCard.querySelector('.element__like');
    localLike.addEventListener('click', addLike);

    // слушатель на просмотр картинки
    const localPicture = newCard.querySelector('.element__image');
    localPicture.addEventListener('click', showImage);

    return newCard;
}

// добавляю новую карточку
popupFormCard.addEventListener('submit', function(evn) {
    const newCard = createCard(popupNameCard.value, popupImageCard.value);
    elements.prepend(newCard); 

     // Предыдущая страница по умолчанию  - стандартное событие. Мы велим не возвращать предыдущую страницу после отправки:
     evn.preventDefault();
     closePopup(popupCard);

})

initialCards.forEach( card => {
    const newCard = createCard(card.name, card.link);
    elements.append(newCard); 
}) 


// закрываю поп-ап просмотра картинки
imageClose.addEventListener('click', function (evn) {
  closePopup(popupImage);
})


