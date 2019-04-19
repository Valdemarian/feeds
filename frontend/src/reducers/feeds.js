//STATE + ЛОГИКА = STORE(ХРАНИЛИЩЕ)
//actions предназначенные для reducer user
import { 
  FEEDS_LOAD, ADD_FEED_ID, DELETE_FEED_ID, 
  EDIT_FEED_ID, FEED_ID, LOGIN_REQUEST, VALIDATE_EDIT, 
  VALIDATE_ADD_FEED, ADD_FEED_STATE_TRUE, ADD_FEED_STATE_FALSE, CLEAR_FEED_ID } from '../actions/feed-action';

const initialState = {
  error: false, // добавили для сохранения текста ошибки
  isFetching: false, // добавили для реакции на статус "загружаю" или нет
  loggedIn: false,// авторизация
  loggedInAuth: false,
  feedsData: [],
  feedIdItem: {},
  editFeedRedirect: false,
  confirm: false,
  validateEdit: false,
  validateAddFeed: false,
  addFeedState: false
}


export default function feeds(state = initialState, action) {

  switch (action.type) {

    case LOGIN_REQUEST://возвращаем новый state, с активной загрузкой, и пустой ошибкой
      return { ...state, isFetching: true,  counter: 'Загрузка', error: false}

    case FEEDS_LOAD:
      return { ...state, feedsData: action.payload, isFetching: false }

    case ADD_FEED_ID:
      return { ...state, feedsData: [...state.feedsData, action.payload], isFetching: false, 
              validateAddFeed: false, addFeedState: false }

    case DELETE_FEED_ID:
      return {...state, feedsData: [...state.feedsData.filter(({ _id }) => _id !== action.payload)], 
              isFetching: false, feedIdItem: {} }

    case FEED_ID:
      return {...state, feedIdItem: action.payload, editFeedRedirect: false, isFetching: false }

    case VALIDATE_EDIT:
      return {...state, validateEdit: true }

    case VALIDATE_ADD_FEED:
      return {...state, validateAddFeed: true }

    case ADD_FEED_STATE_TRUE:
      return {...state, addFeedState: true }

    case ADD_FEED_STATE_FALSE:
      return {...state, addFeedState: false, validateAddFeed: false }

    case CLEAR_FEED_ID:
      return {...state, feedIdItem: {} }


    case EDIT_FEED_ID:

    const { payload: feed } = action;

      return {...state, isFetching: false, editFeedRedirect: true, validateEdit: false,
        feedsData: state.feedsData.map(item => {
          if(item._id === feed._id) {
            return {
              ...item,
              title: feed.title,
              content: feed.content
            }
          }
          return item;
        })
      }

    default:
      return state
  }
}
