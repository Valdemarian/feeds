import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { readFeedId, editFeed, clearFeedId } from '../../actions/feed-action';

import './edir-feed.css'


class EditFeed extends Component {

	state = {
			title: '',
			content: ''
	}

	componentDidMount() {
    	this.props.readFeedIdAction(this.props.itemId)
  	}


  	componentDidUpdate(prevProps) {
	    if (this.props.feeds.feedIdItem !== prevProps.feeds.feedIdItem){


	    	this.setState({ 
	    		title: this.props.feeds.feedIdItem.title,
	    		content: this.props.feeds.feedIdItem.content,
	    	})
	    }
  	}

  	componentWillUnmount(){
  		this.props.clearFeedIdAction()
  	}

	handleSubmit = (e) => {
		e.preventDefault()
	    const { title, content } = this.state

	    this.props.editFeedAction(this.props.itemId, title, content, this.props.googleAuth.token)
  	}

	handleChange = (e) => {
    	const value = e.currentTarget.value
    	const fieldName = e.currentTarget.dataset.fieldName

    	this.setState(state => ({
    		...state,
      		[fieldName]: value,
    	}))
  	}


  render(){
  	const { itemId, redirect, validateEdit } = this.props;
  	const { title, content } = this.state;

  	if(redirect) {
  		return <Redirect to={`/feeds/${itemId}`} />
  	}


  	return(
			<div className="jumbotron edit-feed">
			
				{ validateEdit ? <p>Заполните пустые поля</p> : null }

			    <form onSubmit={this.handleSubmit}>	    
		         	<input data-field-name={'title'}
			            type={'text'}
			            onChange={this.handleChange}
			            placeholder={'Название новости'}
			            value={title}
			            className={validateEdit ? "edit-input border-color" : "edit-input"} />

			        <br />

		          	<textarea data-field-name={'content'}
			            onChange={this.handleChange}
			            placeholder={'Содержание новости'}
			            value={content}
			            rows="15"
			            className={validateEdit ? "edit-textarea border-color" : "edit-textarea"} />

			        <div>

			        	<br />

			            <button type="submit" className="btn btn-primary btn-sm btn-profile btn-edit">Edit Feed</button>

			            <Link to={`/feeds/${itemId}`} >
			            	<button className="btn btn-primary btn-sm btn-profile">Cancel</button>
			            </Link>
			        </div>
			    </form>
		    </div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    feeds: state.feeds,
    googleAuth: state.googleAuth
  }
}


const mapDispatchToProps = dispatch => {
  return {
    readFeedIdAction: (id) => dispatch(readFeedId(id)),
    editFeedAction: (id, title, content, token ) => dispatch(editFeed(id, title, content, token )),
    clearFeedIdAction: () => dispatch(clearFeedId())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditFeed);



EditFeed.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  editFeedAction: PropTypes.func,
}
