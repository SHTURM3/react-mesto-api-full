export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (response) => {
    console.log('response: ', response);
    if (response.ok) {
      return response.json();
    }
  
    return response.json().then((res) => {
      throw res.message[0].messages[0].message;
    })
  }
export const register = ( email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    .catch((err) => {
        if(err.statusCode === 400){
            console.log('некорректно заполнено одно из полей')
        }
    })
  };

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    .catch((err) => {
        if(err.statusCode === 400){
            console.log('не передано одно из полей')
        } else if(err.statusCode === 401) {
            console.log('пользователь с email не найден')
        }
    })
  };

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .catch((err) => {
        if(err.statusCode === 400){
            console.log('Токен не передан или передан не в том формате')
        } else if(err.statusCode === 401) {
            console.log('Переданный токен неккоректен')
        }
    })
  }