import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './add-feed.css'


class AddFeed extends Component {

	state = {
		title: '',
		content: ''
	}

	handleSubmit = (e) => {
		e.preventDefault()
	    const { title, content } = this.state

	    this.props.addFeed(title, content, this.props.token)
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
  	const { title, content } = this.state;

  	const { validateAddFeed, addFeedFalse } = this.props;

  	return(
			<div className="jumbotron add-feed" >
			    <form onSubmit={this.handleSubmit}
			    	  className="add-form">	    
		         	<input data-field-name={'title'}
			            type={'text'}
			            onChange={this.handleChange}
			            placeholder={'Заголовок новости...'}
			            value={title}
			            className={validateAddFeed ? "add-input border-color" : "add-input"}
			            maxLength="40" />


		          	<textarea data-field-name={'content'}
			            onChange={this.handleChange}
			            placeholder={'Содержание новости...'}
			            value={content}
			            cols="65"
			            rows="3"
			            wrap="hard"
			            className={validateAddFeed ? "add-text-area border-color" : "add-text-area"} />

			        <div className={validateAddFeed ? "add-action-validate" : "add-action"}>
			            <button type="submit" className="btn btn-primary btn-sm btn-add-feed">Add Feed</button>
			            <button className="btn btn-primary btn-sm btn-cancel" 
			            		onClick={addFeedFalse}>Cancel</button>
			            <div>{ validateAddFeed ? <p>Заполните пустые поля</p> : null }</div>
			        </div>
			    </form>
		    </div>
		)
	}
}


export default AddFeed;



AddFeed.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  addFeed: PropTypes.func.isRequired,
}
