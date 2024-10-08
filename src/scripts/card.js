//функция добавления и удаления лайка
const toggleLike = (evt) => {
  console.log(evt.target)
  evt.target.classList.toggle('card__like-button_is-active');
};

//функция удаления карточки
const removeElement = (cardElement) => {
  cardElement.remove();
};

//функция создания карточки
const createCard = (card, userId, callbackFunctionsObject) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeCounts = cardElement.querySelector('.card__like-count');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.style.visibility = 'hidden'
  deleteButton.disabled = true

  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  likeCounts.textContent = card.likes.length;
  card.likes.forEach((element) => {
    if(element['_id'] === userId) {
      likeButton.classList.add('card__like-button_is-active')
    }
  })

  likeButton.addEventListener('click', (evt) => callbackFunctionsObject.likePlace(evt, card, likeCounts));
  cardImage.addEventListener('click', () => callbackFunctionsObject.showCard(card.name, card.link));

  if(card.owner['_id'] === userId) {
    deleteButton.style.visibility = 'visible';
    deleteButton.disabled = false
    deleteButton.addEventListener('click', () => callbackFunctionsObject.removePlace(cardElement, card), {once: true});
  }
  
  return cardElement;
}

export { createCard, toggleLike, removeElement };