import React from 'react';
import './form.css';
import { Redirect } from 'react-router-dom';

class Form extends  React.Component {



	state = {
    	username: '',
    	password: '',
 	}

 	handleSubmit = (e) => {
	    e.preventDefault()
	    const { username, password } = this.state

	    this.props.handleLogin(username, password)
  	}

	handleChange = (e) => {
    	const value = e.currentTarget.value
    	const fieldName = e.currentTarget.dataset.fieldName

    	this.setState(state => ({
    		...state,
      		[fieldName]: value,
    	}))
    	console.log(e.currentTarget.value)
  	}


	render(){


		const { counter, loggedIn } = this.props;
		const { username, password } = this.state;

		
		if(loggedIn) {
    		return <Redirect to="/profile" />
  		}

		return (
			<div className="jumbotron form">
			    <form onSubmit={this.handleSubmit}>	    
		         	<input  data-field-name={'username'}
			            type={'text'}
			            onChange={this.handleChange}
			            placeholder={'Имя'}
			            value={username}
			            className="input" />

			        <br />

		          	<input data-field-name={'password'}
		        		type={'password'}
			            onChange={this.handleChange}
			            placeholder={'Пароль'}
			            value={password}
			            className="input" />

			        <div>
			        	<br />
			            <button type="submit" className="btn btn-primary btn-sm btn-profile">Войти</button>
			        </div>

			        {counter}
			    </form>
		    </div>
		)
	}
}


export default Form;




















