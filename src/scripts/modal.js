import { copyProfileInfo, copyModalCardInfo, handleFormSubmit } from './form.js';

const AnimationTime = 600;

//функция проверки нажатия клавиши
const keyHandler = function(popup, evt) {
  if(evt.key == 'Escape') {
    closeModal(popup);
  }
}

//функция проверки на контейнер
const checkPopup = (popup, evt) => {
  if(evt.target.classList.contains('popup')){
    closeModal(popup);
  }
}

//функция открытия попапа
const openModal = function(popup) {
  popup.querySelector('.popup__content').style.cursor = 'default';
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0);
  popup.style.cursor = 'pointer';
  window.addEventListener('keydown', (evt) => keyHandler(popup, evt));
}

//функция закрытия попапа
const closeModal = function(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, AnimationTime);
}

//функция модуля редактирования профиля
const showModalEditProfile = (name, job) => {
  const popupEdit = document.querySelector('.popup_type_edit');
  
  //Объявление формы для редактирования профиля
  const formEditProfile = document.forms["edit-profile"];
  const inputName = formEditProfile.elements.name;
  const inputJob = formEditProfile.elements.description;
  const closeButton = popupEdit.querySelector('.popup__close');
  
  copyProfileInfo(inputName, inputJob, name, job);

  openModal(popupEdit);

  closeButton.addEventListener('click', () => closeModal(popupEdit), {once: true});
  popupEdit.addEventListener('click', (evt) => checkPopup(popupEdit, evt));
  formEditProfile.addEventListener('submit', (evt) => handleFormSubmit(popupEdit, evt), {once: true});

  window.removeEventListener('keydown', (evt) => keyHandler);
}

//функция модуля добавления новой карточки
const showModalAddCard = () => {
  const popupNewCard = document.querySelector('.popup_type_new-card');

  //Объявление формы для добавления карточек
  const formAddCard = document.forms["new-place"];
  const inputPlace = formAddCard.elements["place-name"];
  const inputLink = formAddCard.elements.link;
  const closeButton = popupNewCard.querySelector('.popup__close');

  inputPlace.value = '';
  inputLink.value = '';
  
  openModal(popupNewCard);

  closeButton.addEventListener('click', () => closeModal(popupNewCard), {once: true});
  window.addEventListener('keydown', (evt) => keyHandler(popupNewCard, evt));
  popupNewCard.addEventListener('click', (evt) => checkPopup(popupNewCard, evt));
  formAddCard.addEventListener('submit', (evt) => handleFormSubmit(popupNewCard, evt), {once: true});

  window.removeEventListener('keydown', (evt) => keyHandler);
}

//функция модуля открытия карточки
const showCard = (cardImage) => {
  const popupCard = document.querySelector('.popup_type_image');
  const image = popupCard.querySelector('.popup__image');
  const popupCaption = popupCard.querySelector('.popup__caption');
  const closeButton = popupCard.querySelector('.popup__close');

  copyModalCardInfo(cardImage, image, popupCaption)
  openModal(popupCard);

  closeButton.addEventListener('click', () => closeModal(popupCard), {once: true});
  window.addEventListener('keydown', (evt) => keyHandler(popupCard, evt));
  popupCard.addEventListener('click', (evt) => checkPopup(popupCard, evt));

  window.removeEventListener('keydown', (evt) => keyHandler);
}

export { keyHandler, checkPopup, openModal, closeModal, showModalEditProfile, showModalAddCard, showCard };