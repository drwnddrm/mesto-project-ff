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
  .then((res) => {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  })
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  })
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
}

const editProfileAvatar = (src) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: src
    })
  })
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
}

const removePlaceFromServer = (card) => {
  return fetch(`${config.baseUrl}/cards/${card["_id"]}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

const putLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card["_id"]}`, {
    method: 'PUT',
    headers: config.headers
  })
}

const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card["_id"]}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export { getProfileValues, getCards, editProfileInfo, editProfileAvatar, addNewCard, removePlaceFromServer, putLike, deleteLike }