import './styles/index.css';
import initialCards from './scripts/cards.js';
import { createCard, likeCard, removePlace } from './scripts/card.js';
import { showModalEditProfile, showModalAddCard, showCard } from './scripts/modal.js';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

initialCards.forEach(element => placesList.append(createCard(element, likeCard, showCard, removePlace)));

editProfileButton.addEventListener('click', () => showModalEditProfile(profileName, profileJob));
addCardButton.addEventListener('click', () => showModalAddCard());

export { placesList, profileName, profileJob };