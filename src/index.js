import './styles/index.css';
import initialCards from './scripts/cards.js';
import { createCard, likeCard, removePlace } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');

//Объявление формы для редактирования профиля
const formEditProfile = document.forms["edit-profile"];
const inputName = formEditProfile.elements.name;
const inputJob = formEditProfile.elements.description;

//Объявление формы для добавления карточек
const formAddCard = document.forms["new-place"];
const inputPlace = formAddCard.elements["place-name"];
const inputLink = formAddCard.elements.link;

const image = popupCard.querySelector('.popup__image');
const popupCaption = popupCard.querySelector('.popup__caption');

const newCard = {};

const handleFormSubmitProfile = (popup, evt, name, job) => {
  evt.preventDefault();
  
  profileName.textContent = name;
  profileJob.textContent = job;
  
  closeModal(popup);
}

const handleFormSubmitCard = (popup, evt, name, link) => {
  evt.preventDefault();
  
  newCard.name = name;
  newCard.link = link;

  placesList.prepend(createCard(newCard, {likeCard, showCard, removePlace}));
  
  closeModal(popup);
}

const showModalEditProfile = (name, job) => {
  inputName.value = name;
  inputJob.value = job;

  openModal(popupEdit);

  formEditProfile.addEventListener('submit', (evt) => handleFormSubmitProfile(popupEdit, evt, evt.target[0].value, evt.target[1].value), {once: true});
}

//функция модуля добавления новой карточки
const showModalAddCard = () => {
  inputPlace.value = '';
  inputLink.value = '';
  
  openModal(popupNewCard);
  
  formAddCard.addEventListener('submit', (evt) => handleFormSubmitCard(popupNewCard, evt, evt.target[0].value, evt.target[1].value), {once: true});
}

//функция модуля показа карточки
const showCard = (name, link) => {
  popupCaption.textContent = name;
  image.alt = name;
  image.src = link;

  openModal(popupCard);
}

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

initialCards.forEach(element => placesList.append(createCard(element, {likeCard, showCard, removePlace})));

editProfileButton.addEventListener('click', () => showModalEditProfile(profileName.textContent, profileJob.textContent));
addCardButton.addEventListener('click', () => showModalAddCard());