import { copyCardInfo } from './form.js';

//функция добавления и удаления лайка
const likeCard = (evt) => evt.target.classList.toggle('card__like-button_is-active');

//функция удаления карточки
const removePlace = (card) => card.remove();

//функция создания карточки
const createCard = (card, ...args) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  copyCardInfo(card, cardImage, cardTitle);

  likeButton.addEventListener('click', (evt) => args[0](evt));
  cardImage.addEventListener('click', () => args[1](cardImage));
  deleteButton.addEventListener('click', () => args[2](cardElement), {once: true});
  
  return cardElement;
}

export { createCard, likeCard, removePlace };