import { createCard, likeCard, removePlace } from './card.js';
import { closeModal, showCard } from './modal.js'
import { placesList, profileName, profileJob } from '../index.js';

//функция дублирования информации профиля
const copyProfileInfo = (...args) => {
  if(args[0].value != undefined) {
    args[0].value = args[2].textContent;
    args[1].value = args[3].textContent;
  }else {
    args[0].textContent = args[2].value;
    args[1].textContent = args[3].value;
  }
}

//функция дублирования в модуль показа карточки
const copyModalCardInfo = (origin, duplicate, element) => {
  element.textContent = origin.alt;
  duplicate.alt = origin.alt;
  duplicate.src = origin.src;
}

//функция дублирования информации карточки
const copyCardInfo = (origin, duplicate, element) => {
  element.textContent = origin.name;
  duplicate.alt = origin.name;
  duplicate.src = origin.link;
}

//функция обработки форм
const handleFormSubmit = (popup, evt) => {
  const newCard = {};
  
  evt.preventDefault();
  
  if(popup.classList.contains('popup_type_edit')) {
    copyProfileInfo(profileName, profileJob, evt.target[0], evt.target[1]);
  }else if(popup.classList.contains('popup_type_new-card')) {
    newCard.name = evt.target[0].value;
    newCard.link = evt.target[1].value;

    placesList.prepend(createCard(newCard, likeCard, showCard, removePlace));
  }
  closeModal(popup);
}

export { copyProfileInfo, copyModalCardInfo, copyCardInfo, handleFormSubmit };