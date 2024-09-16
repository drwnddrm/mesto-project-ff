import './styles/index.css';
import { createCard, toggleLike, removeElement } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getProfileValues, getCards, editProfileInfo, editProfileAvatar, addNewCard, removePlaceFromServer, putLike, deleteLike } from './scripts/api.js';

import {placesList, profileName, profileJob, 
  profileImage, editProfileButton, editProfileImageButton,
  addCardButton, popups, popupEdit, popupAvatar,
  popupNewCard, popupCard, formEditProfile, inputName, inputJob,
  formAddCard, inputPlace, inputLink, formEditAvatar, inputProfileImage,
  image, popupCaption, validationConfig } from './scripts/constants.js';

const handleFormSubmitProfile = (popup, evt, name, about) => {
  const btn = popup.querySelector('.popup__button')
  
  evt.preventDefault();
  
  btn.textContent = 'Сохранение...';
  editProfileInfo(name, about)
  .then((result) => {
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
    btn.textContent = 'Сохранить';
  })
  .catch((err) => {
    console.log(err);
  });

  
  
  closeModal(popup);
}

const handleFormSubmitAvatar = (popup, evt, src) => {
  const btn = popup.querySelector('.popup__button')

  evt.preventDefault();
  
  btn.textContent = 'Сохранение...';
  editProfileAvatar(src)
  .then(() => {
    btn.textContent = 'Сохранить';
  })
  .catch((err) => {
    console.log(err);
  });
  
  profileImage.style["background-image"] = `url(${src})`;
  
  closeModal(popup);
}

const handleFormSubmitCard = (popup, evt, nameCard, linkCard) => {
  const btn = popup.querySelector('.popup__button')
  
  evt.preventDefault();
  
  btn.textContent = 'Сохранение...';
  addNewCard(nameCard, linkCard)
  .then((result) => {
    placesList.prepend(createCard(result, {likePlace, showCard, removePlace}))
    btn.textContent = 'Сохранить';
  })
  .catch((err) => {
    console.log(err);
  });
  
  closeModal(popup);
}

const showModalEditProfile = (name, job) => {
  inputName.value = name;
  inputJob.value = job;

  clearValidation(popupEdit, validationConfig);
  enableValidation(validationConfig);

  openModal(popupEdit);

  formEditProfile.addEventListener('submit', (evt) => handleFormSubmitProfile(popupEdit, evt, evt.target[0].value, evt.target[1].value), {once: true});
}

const showModalEditAvatar = () => {
  inputProfileImage.value = '';
  
  clearValidation(popupAvatar, validationConfig);
  enableValidation(validationConfig);
  openModal(popupAvatar);

  formEditAvatar.addEventListener('submit', (evt) => handleFormSubmitAvatar(popupAvatar, evt, inputProfileImage.value), {once: true})
}

//функция модуля добавления новой карточки
const showModalAddCard = () => {
  inputPlace.value = '';
  inputLink.value = '';

  clearValidation(popupNewCard, validationConfig);
  enableValidation(validationConfig);

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

const likePlace = (evt, card, likeCounts) => {
  toggleLike(evt)
  if(evt.target.classList.contains('card__like-button_is-active')) {
    putLike(card)
    .then((result) => {
      likeCounts.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }else {
    deleteLike(card)
    .then((result) => {
      likeCounts.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

const removePlace = (cardElement, card) => {
  removeElement(cardElement);

  removePlaceFromServer(card)
  .catch((err) => {
    console.log(err);
  });
}

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(popup)
  });
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

editProfileImageButton.addEventListener('click', () => showModalEditAvatar())
editProfileButton.addEventListener('click', () => showModalEditProfile(profileName.textContent, profileJob.textContent));
addCardButton.addEventListener('click', () => showModalAddCard());

getProfileValues()
.then((result) => {
  profileImage.style["background-image"] = `url(${result.avatar})`
  profileName.textContent = result.name;
  profileJob.textContent = result.about;
  profileImage.src = result.avatar;
})
.catch((err) => {
  console.log(err);
});

getCards()
.then((result) => {
  result.forEach((element) => placesList.append(createCard(element, {likePlace, showCard, removePlace})))
})
.catch((err) => {
  console.log(err);
});
