
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGIN_OUT, 
  PROFILE_SUCCESS, 
  NEWS_SUCCESS,
  LOGIN_AUTH_IN,
  LOGIN_AUTH_OUT } from '../actions/user-action';

const initialState = {

  counter: 'Введите логин и пароль',
  error: false, 
  isFetching: false, // добавили для реакции на статус "загружаю" или нет
  loggedIn: false,// авторизация
  loggedInAuth: false,
  profileData: {},
  newsData: [],
  newsDataLog: false,
  feedsData: [],
  userId: ''
}


export default function auth(state = initialState, action) {

  switch (action.type) {
    case LOGIN_REQUEST://возвращаем новый state, с активной загрузкой, и пустой ошибкой
      return { ...state, isFetching: true,  counter: 'Загрузка', error: false}

    case LOGIN_SUCCESS://возвращаем новый state, с отключенной загрузкой и поле name с полученными данными
      return { ...state, isFetching: false, loggedIn: true, error: false }

    case LOGIN_FAIL://возвращаем новый state, с отключенной загрузкой, и ошибку с сообщением ошибки
      return { ...state, isFetching: false,  counter: 'Имя пользователя или пароль введены не верно',
               loggedIn: false, error: true }

    case LOGIN_OUT://возвращаем новый state, с отключенной загрузкой, и ошибку с сообщением ошибки
      return { ...state, isFetching: false, loggedIn: false, error: false, counter: 'Введите логин и пароль'}

    case PROFILE_SUCCESS://возвращаем новый state, с отключенной загрузкой и поле name с полученными данными
      return { ...state, isFetching: false, counter: action.payload, loggedIn: true, error: false, profileData: action.payload }

    case NEWS_SUCCESS://возвращаем новый state, с отключенной загрузкой и поле name с полученными данными
      return { ...state, isFetching: false, counter: action.payload, loggedIn: true, error: false, 
        newsData: action.payload, newsDataLog: true }

    case LOGIN_AUTH_IN://возвращаем новый state, с отключенной загрузкой и поле name с полученными данными
      return { ...state, loggedInAuth: true, userId: action.payload }

    case LOGIN_AUTH_OUT://возвращаем новый state, с отключенной загрузкой и поле name с полученными данными
      return { ...state, loggedInAuth: false }

    default:
      return state
  }
}

