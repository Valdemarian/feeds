export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_OUT = 'LOGIN_OUT'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const NEWS_SUCCESS = 'NEWS_SUCCESS'
export const LOGIN_AUTH_IN = 'LOGIN_AUTH_IN'
export const LOGIN_AUTH_OUT = 'LOGIN_AUTH_OUT'


export function handleLogin(username, password) {

  const json = response => {//принимает в себя response(обьект от api) 
  //                и если он получен то возвращает его в формате json
    return response.json()//получение json от api
  }


  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST,
    })

    fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
      method: 'post',
      body: JSON.stringify({email: username, password: password}),
      headers: {
          'content-type': 'application/json'
      }
    })
    .then(json)//парсим ответ как json(сработает только если мы получили response.status == 200(успешный запрос))
    .then(login => {//если принимает в себя пустой аргумент(как e = event) то он автоматически становится responce
    //              принимает в себя обьект responce
      if (login.status === "ok") {//проверяем параметр "ок" в responce.status (полученный обьект json)
        dispatch({ 
          type: LOGIN_SUCCESS,
          payload: login.data.id
        })
      } else {
        dispatch({ 
          type: LOGIN_FAIL, 
        })
      }
    })

    fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/1')
    .then(json)
    .then(profile => {
      if (profile.status === "ok") {
        dispatch({ 
          type: PROFILE_SUCCESS,
          payload: profile.data
        })
      } else {
        dispatch({ 
          type: LOGIN_FAIL, 
        })
      }
    })

    fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/news')
    .then(json)
    .then(news => {
      if (news.status === "ok") {
        dispatch({ 
          type: NEWS_SUCCESS,
          payload: news.data
        })
      console.log(news)
      } else {
        dispatch({ 
          type: LOGIN_FAIL, 
        })
      }
    })
    .catch(error => {
      console.log('error', error);
    })
  }
};


export function loginOut(){
  return (dispatch) => {
    dispatch({
        type: LOGIN_OUT
    })
  }
}



export function loginAuthIn(userId){
  return (dispatch) => {
    dispatch({
        type: LOGIN_AUTH_IN,
        payload: userId
    })
  }
}

export function loginAuthOut(){
  return (dispatch) => {
    dispatch({
        type: LOGIN_AUTH_OUT
    })
  }
}