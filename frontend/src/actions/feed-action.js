export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const FEEDS_LOAD = 'FEEDS_LOAD'
export const ADD_FEED_ID = 'ADD_FEED_ID'
export const DELETE_FEED_ID = 'DELETE_FEED_ID'
export const EDIT_FEED_ID = 'EDIT_FEED_ID'
export const FEED_ID = 'FEED_ID'
export const VALIDATE_EDIT = 'VALIDATE_EDIT'
export const VALIDATE_ADD_FEED = 'VALIDATE_ADD_FEED'
export const ADD_FEED_STATE_TRUE = 'ADD_FEED_STATE_TRUE'
export const ADD_FEED_STATE_FALSE = 'ADD_FEED_STATE_FALSE'
export const CLEAR_FEED_ID = 'CLEAR_FEED_ID'


export function feedsDataLoading(){
  const json = response => {
    return response.json()
  }

  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST,
    })

    setTimeout(() => {
	  fetch('http://127.0.0.1:5000/api/v1/feeds')
	    .then(json)
	    .then(res => {
	        dispatch({ 
	          type: FEEDS_LOAD,
	          payload: res.feeds
	        })
	        console.log(res)
	      })
	    .catch(error => {
	      console.log('error', error);
	    })
	}, 500)
  }
}


export function addFeed(title, content, token) {

  const json = response => {
    return response.json()
  }


  return (dispatch) => {

    if(title === '' || content === ''){
        dispatch({
          type: VALIDATE_ADD_FEED,
        })

    } else { 

      dispatch({
        type: LOGIN_REQUEST,
      })

      //делаем post запрос на сервер где fetch(url, данные)
      fetch('http://127.0.0.1:5000/api/v1/feeds', {
        method: 'post',
        body: JSON.stringify({title: title, content: content}),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        }
      })
      .then(json)
      .then(res => {
        dispatch({
          type: ADD_FEED_ID,
          payload: res.feed
        })
      })
    } 
  }
};

export function editFeed(id, title, content, token) {

  const json = response => {
    return response.json()
  }

  return (dispatch) => {

    if(title === '' || content === ''){
        dispatch({
          type: VALIDATE_EDIT,
        })

    } else { 

      dispatch({
        type: LOGIN_REQUEST,
      })

      fetch(`http://127.0.0.1:5000/api/v1/feeds/${id}`, {
        method: 'put',
        body: JSON.stringify({_id: id, title: title, content: content}),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        }
      })
      .then(json)
      .then(res => {
        dispatch({
          type: EDIT_FEED_ID,
          payload: res.feed
        })
        console.log(res)
      })
    } 
  }
};

export function deleteFeed(id, token) {

  const json = response => {
    return response.json()
  }

  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST,
    })

    fetch(`http://127.0.0.1:5000/api/v1/feeds/${id}`, {
      method: 'delete',
      headers: {
          'content-type': 'application/json',
          'x-access-token': token

      }
    })
    .then(json)
    .then(res => {
      dispatch({
        type: DELETE_FEED_ID,
        payload: res._id
      })
      console.log(res)
    })
  }
};



export function readFeedId(id) {

  const json = response => {
    return response.json()
  }


  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST,
    })

    setTimeout(() => {
	    fetch(`http://127.0.0.1:5000/api/v1/feeds/${id}`)
	    .then(json)
	    .then(res => {
	      dispatch({
	        type: FEED_ID,
	        payload: res.feed
	      })
	      console.log(res)
	    })
    }, 500)
  } 
};

export function addFeedTrue() {

  return (dispatch) => {

    dispatch({
      type: ADD_FEED_STATE_TRUE,
    })
  }
}

export function addFeedFalse() {

  return (dispatch) => {

    dispatch({
      type: ADD_FEED_STATE_FALSE,
    })
  }
}

export function clearFeedId() {

  return (dispatch) => {

    dispatch({
      type: CLEAR_FEED_ID,
    })
  }
}