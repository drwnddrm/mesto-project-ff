const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileImageButton = document.querySelector('.profile__edit_image-button')
const addCardButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_type_edit_profile-image')
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

//Объявление формы для редактирования аватарки
const formEditAvatar = document.forms["avatar"];
const inputProfileImage = formEditAvatar.elements.url;

const image = popupCard.querySelector('.popup__image');
const popupCaption = popupCard.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export { placesList, profileName, profileJob, 
  profileImage, editProfileButton, editProfileImageButton,
  addCardButton, popups, popupEdit, popupAvatar,
  popupNewCard, popupCard, formEditProfile, inputName, inputJob,
  formAddCard, inputPlace, inputLink, formEditAvatar, inputProfileImage,
  image, popupCaption, validationConfig };