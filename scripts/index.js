// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const createCard = (title, link, callback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').alt = title;
  cardElement.querySelector('.card__image').src = link;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    callback(cardElement);
  });

  return cardElement;
}

const removePlace = (cardElement) => {
  cardElement.remove();
}

initialCards.forEach(element => {
  placesList.append(createCard(element.name, element.link, removePlace))
});