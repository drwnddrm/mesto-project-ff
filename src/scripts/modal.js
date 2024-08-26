const AnimationTime = 600;

//функция открытия попапа
function openModal(popup) {
  popup.style.cursor = 'pointer';
  popup.querySelector('.popup__content').style.cursor = 'default';
  popup.classList.add('popup_is-animated');
  
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0);

  document.addEventListener('keydown', closeModalEscape);
}

//функция закрытия попапа
function closeModal(popup) {
  document.removeEventListener('keydown', closeModalEscape);

  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, AnimationTime);
}

//функция закрытия попапа клавишей Escape
function closeModalEscape(event) {
  if(event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export { openModal, closeModal };