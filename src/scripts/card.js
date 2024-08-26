//функция добавления и удаления лайка
const likeCard = (evt) => evt.target.classList.toggle('card__like-button_is-active');

//функция удаления карточки
const removePlace = (card) => card.remove();

//функция создания карточки
const createCard = (card, callbackFunctionsObject) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  likeButton.addEventListener('click', (evt) => callbackFunctionsObject.likeCard(evt));
  cardImage.addEventListener('click', () => callbackFunctionsObject.showCard(card.name, card.link));
  deleteButton.addEventListener('click', () => callbackFunctionsObject.removePlace(cardElement), {once: true});
  
  return cardElement;
}

export { createCard, likeCard, removePlace };