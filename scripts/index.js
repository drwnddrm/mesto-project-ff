// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__add-button');

let index = 0;

const addPlace = (title, link, callback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').alt = title;
  cardElement.querySelector('.card__image').src = link;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    callback(cardElement);
  });

  placesList.append(cardElement);
}

const removePlace = (cardElement) => {
  cardElement.remove();
}

addButton.addEventListener('click', () => {  
  let titleName = initialCards[index].name;
  let imageLink = initialCards[index].link;
  
  addPlace(titleName, imageLink, removePlace);
  index++;
});