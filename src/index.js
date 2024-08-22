// @todo: создать инфраструктурное окружение с помощью Webpack

// @todo: разбить код на отдельные модули

// @todo: реализовать работу модальных окон редактирования профиля, 

// @todo: реализовать работу добавления карточки и превью фотографии

// @todo: реализовать работу действие лайка на карточке
import './styles/index.css';
import initialCards from './scripts/cards.js'


const content = document.querySelector('.content');
// import { from } from 'core-js/core/array';
const placesList = content.querySelector('.places__list');

const createCard = (card, callback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    callback(cardElement);
  });

  return cardElement;
}

const removePlace = (cardElement) => {
  cardElement.remove();
}

initialCards.forEach(element => {
  placesList.append(createCard(element, removePlace))
});