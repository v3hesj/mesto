export default class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getServerResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCard () {
    return fetch (`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._getServerResponse);
  }

  getUserInfo () {
    return fetch (`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._getServerResponse);
  }

  updateUserInfo ({ name, about }) {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: name,
        about: about
      })
    })
    .then(this._getServerResponse);
  }

  updateUserAvatar (avatar) {
    return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: avatar
      })
    })
    .then(this._getServerResponse);
  }

  addNewCard ({ name, link }) {
    return fetch (`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: name,
        link: link
      }) 
    })
    .then(this._getServerResponse);
  }

  deleteCard (id) {
    return fetch (`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getServerResponse);
  }

  addLike (id) {
    return fetch (`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getServerResponse);
  }

  deleteLike (id) {
    return fetch (`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getServerResponse);
  }
}