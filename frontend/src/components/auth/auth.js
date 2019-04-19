import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInGoogle } from '../../actions/google-auth-action';

import './auth.css';


class Auth extends Component {

	state = {
   		name: null
 	}

  componentDidMount() {
    const _onInit = auth2 => {
      console.log('init OK', auth2)
    }
    const _onError = err => {
      console.log('error', err)
    }
    window.gapi.load('auth2', function() {//обьект window делает переменную глобальной
      window.gapi.auth2
        .init({ // не забудьте указать ваш ключ в .env
          client_id: '611659595716-gukm240un1t62fc010ect0flja91hl6d.apps.googleusercontent.com',
        })
        .then(_onInit, _onError)
    })
  }

  signIn = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance()

    const _authOK = (googleUser) => {
      console.log('мы вошли!', googleUser.getBasicProfile().getName())
      // console.log('токен', googleUser.getAuthResponse().id_token)
      this.setState({
        name: googleUser.getBasicProfile().getName()
      })

      this.props.signInGoogleAction(googleUser.getAuthResponse().id_token)

      this.props.loginAuthIn(googleUser.getBasicProfile().getId())
    }

    const _authErr = err => {
      console.log('error', err)
    }

    GoogleAuth.signIn({scope: 'profile email'})
      .then(_authOK, _authErr)
  }

  signOut = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance()

    GoogleAuth.signOut().then(
      () => {
        this.setState({
          name: null
        })
        this.props.loginAuthOut()
      },
      () => console.log('signOut ERROR')
    )
  }


  render(){
  	const { name } = this.state

  	return(

		<div className="d-flex auth">
	        <div className="name-container"> {name && <p className="auth-name">{name}</p>}</div>
	        {!name && <button onClick={this.signIn} className="btn btn-primary btn-md logbtn">Log In</button>}
	        {name && <button onClick={this.signOut} className="btn btn-primary btn-md logbtn">Log Out</button>}
	  </div>
	)
  }
}

const mapStateToProps = (state) => {
  return {
    googleAuth: state.googleAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
   signInGoogleAction: (id_token) => dispatch(signInGoogle(id_token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
