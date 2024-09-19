import { checkResponse } from '../utils/utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: 'add366ff-e6ae-4bcd-88b2-d194d44653a1',
    'Content-Type': 'application/json'
  }
}

const getProfileValues = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse)
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse)
}

const editProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
}

const editProfileAvatar = (src) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: src
    })
  })
  .then(checkResponse)
}

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

const removePlaceFromServer = (card) => {
  return fetch(`${config.baseUrl}/cards/${card["_id"]}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

const putLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card["_id"]}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
}

const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card["_id"]}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

export { getProfileValues, getCards, editProfileInfo, editProfileAvatar, addNewCard, removePlaceFromServer, putLike, deleteLike }