export const SIGN_IN = 'SIGN_IN'


export function signInGoogle(id_token){
 	const json = response => {
    	return response.json()
  	}

 	return (dispatch) => {

	  fetch('http://127.0.0.1:5000/api/v1/auth/google', {
	    method: 'post',
	    body: JSON.stringify({token: id_token }),
	    headers: {
	        'content-type': 'application/json',
	    }
	  })
	  .then(json)
	  .then(res => {
	  	dispatch({ 
	        type: SIGN_IN,
	        payload: res.token
	    })
	  	console.log(res)
	    })
	  }
}
