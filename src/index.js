import './styles/index.css';
import { createCard, toggleLike, removeElement } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { checkResponse } from './scripts/utils.js';
import { getProfileValues, getCards, editProfileInfo, editProfileAvatar, addNewCard, removePlaceFromServer, putLike, deleteLike } from './scripts/api.js';

import { placesList, profileName, profileJob, 
  profileImage, editProfileButton, editProfileImageButton,
  addCardButton, popups, popupEdit, popupAvatar,
  popupNewCard, popupCard, formEditProfile, inputName, inputJob,
  formAddCard, inputPlace, inputLink, formEditAvatar, inputProfileImage,
  image, popupCaption, validationConfig } from './scripts/constants.js';

const handleFormSubmitProfile = (popup, evt, name, about) => {
  evt.preventDefault();
  
  evt.submitter.textContent = 'Сохранение...';
  clearValidation(popup, validationConfig);
  
  editProfileInfo(name, about)
  .then(checkResponse)
  .then((result) => {
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
    closeModal(popup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
  });
}

const handleFormSubmitAvatar = (popup, evt, src) => {
  evt.preventDefault();
  
  evt.submitter.textContent = 'Сохранение...';
  clearValidation(popup, validationConfig);
  
  editProfileAvatar(src)
  .then(checkResponse)
  .then(() => {
    profileImage.style["background-image"] = `url(${src})`;
    closeModal(popup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
  });
}

const handleFormSubmitCard = (popup, evt, nameCard, linkCard) => {
  evt.preventDefault();
  
  evt.submitter.textContent = 'Сохранение...';
  clearValidation(popup, validationConfig);
  
  addNewCard(nameCard, linkCard)
  .then(checkResponse)
  .then((result) => {
    placesList.prepend(createCard(result, result.owner['_id'], {likePlace, showCard, removePlace}));
    closeModal(popup);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
  });
}

const showModalEditProfile = (name, job) => {
  inputName.value = name;
  inputJob.value = job;

  openModal(popupEdit);
}

const showModalEditAvatar = () => {
  inputProfileImage.value = '';

  openModal(popupAvatar);
}

//функция модуля добавления новой карточки
const showModalAddCard = () => {
  inputPlace.value = '';
  inputLink.value = '';

  openModal(popupNewCard);
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
    .then(checkResponse)
    .then((result) => {
      likeCounts.textContent = result.likes.length;
    })
    .catch((err) => {
      console.error(err);
    });
  }else {
    deleteLike(card)
    .then(checkResponse)
    .then((result) => {
      likeCounts.textContent = result.likes.length;
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

const removePlace = (cardElement, card) => {
  removePlaceFromServer(card)
  .then(checkResponse)
  .then(() => {
    removeElement(cardElement);
  })
  .catch((err) => {
    console.error(err);
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

enableValidation(validationConfig);

editProfileImageButton.addEventListener('click', () => showModalEditAvatar())
editProfileButton.addEventListener('click', () => showModalEditProfile(profileName.textContent, profileJob.textContent));
addCardButton.addEventListener('click', () => showModalAddCard());
formEditProfile.addEventListener('submit', (evt) => handleFormSubmitProfile(popupEdit, evt, evt.target[0].value, evt.target[1].value));
formEditAvatar.addEventListener('submit', (evt) => handleFormSubmitAvatar(popupAvatar, evt, inputProfileImage.value));
formAddCard.addEventListener('submit', (evt) => handleFormSubmitCard(popupNewCard, evt, evt.target[0].value, evt.target[1].value));

Promise.all([getProfileValues(), getCards()])
.then(([userData, cards]) => {
  profileImage.style["background-image"] = `url(${userData.avatar})`
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileImage.src = userData.avatar;

  cards.forEach((element) => placesList.append(createCard(element, userData['_id'], {likePlace, showCard, removePlace})))
})
.catch((err) => {
  console.error(err);
})