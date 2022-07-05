
const divPopupProfile = document.querySelector('#popup-profile');
const btnPopupClose = divPopupProfile.querySelector('.popup__close');
const popupName = divPopupProfile.querySelector('#popup-name');
const popupDescription = divPopupProfile.querySelector('#popup-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupButton = document.querySelector('.popup__button');
const popupForm = divPopupProfile.querySelector('.popup__form');
const cardElements = document.querySelectorAll('.element'); //в cardElements будет лежать массив

const imageClose = document.querySelector('#image-close');
const popupImage = document.querySelector('#popup-big-image');
const popupPicture = popupImage.querySelector('.popup-image__picture');

// открываю поп-ап редактирования профиля
const btnPopupOpen = document.querySelector('.profile__edit-button');

btnPopupOpen.addEventListener('click', function(evn) {
    divPopupProfile.classList.add('popup_opened');

popupName.value = profileName.textContent;
popupDescription.value = profileDescription.textContent;
})


// закрываю поп-ап редактирования профиля
btnPopupClose.addEventListener('click', function (evn) {
    divPopupProfile.classList.remove('popup_opened');
})


// редактирую профиль: ищу на основной странице элементы, которые должны быть заменены и в поп-апе, ищу кнопку Сохранить и подменяю содержимое
popupForm.addEventListener('submit', function(evn) {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    
    // Предыдущая страница по умолчанию  - стандартное событие. Мы велим не возвращать предыдущую страницу после отправки:
    evn.preventDefault();
    divPopupProfile.classList.remove('popup_opened');
})


//добавление карточек на сайт
const divPopupCard = document.querySelector('#popup-card');
const btnPopupCardClose = divPopupCard.querySelector('.popup__close');
const popupFormCard = divPopupCard.querySelector('.popup__form');
const popupNameCard = divPopupCard.querySelector('#popup-name-card');
const popupImageCard = divPopupCard.querySelector('#popup-image');

const profileButton = document.querySelector('.profile__button');
const cardTemplate = document.querySelector('#card-template');

const elements = document.querySelector('.elements');


//открываю поп-ап создания карточки
profileButton.addEventListener('click', function(evn) {
    divPopupCard.classList.add('popup_opened');  
    
    popupNameCard.value = '';
    popupImageCard.value = '';
    
})

//закрываю поп-ап создания карточки
btnPopupCardClose.addEventListener('click', function (evn) {
    divPopupCard.classList.remove('popup_opened');
})

// функция, которая удаляет элемент со страницы (её мы вызываем два раза - 
//для карточек, которые  на странице при загрузке сайта и для новых карточек)
function removeCard(evn) {
    let localTrash = evn.target;
    let localCard = localTrash.parentElement;
    localCard.remove();
}

// функция, которая сохраняет/удаляет, т.е. переключает(toggle) лайки
function addLike(evn) {
    let localLike = evn.target;
    localLike.classList.toggle('element__like_active');
}

//функция, которая открывает поп-ап просмотра картинки
function showImage(evn) {
    let localImage = evn.target;
    let link = localImage.getAttribute('src');
    popupPicture.setAttribute('src', link);
    popupImage.classList.add('popup-image_opened');
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
    let localTrash = newCard.querySelector('.element__trash');
    localTrash.addEventListener('click', removeCard);   

    //вешаю слушателя на кнопку лайка
    let localLike = newCard.querySelector('.element__like');
    localLike.addEventListener('click', addLike);

    // слушатель на просмотр картинки
    let localPicture = newCard.querySelector('.element__image');
    localPicture.addEventListener('click', showImage);

    return newCard;
}

// добавляю новую карточку
popupFormCard.addEventListener('submit', function(evn) {
    const newCard = createCard(popupNameCard.value, popupImageCard.value);
    elements.prepend(newCard); 

     // Предыдущая страница по умолчанию  - стандартное событие. Мы велим не возвращать предыдущую страницу после отправки:
     evn.preventDefault();
     divPopupCard.classList.remove('popup_opened');

})

initialCards.forEach( card => {
    let newCard = createCard(card.name, card.link);
    elements.append(newCard); 
}) 


// закрываю поп-ап просмотра картинки
imageClose.addEventListener('click', function (evn) {
  popupImage.classList.remove('popup-image_opened');
})


