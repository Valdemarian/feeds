import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { readFeedId, clearFeedId } from '../../actions/feed-action';
import Spinner from '../../components/spinner';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';



import './feed-item.css'


class FeedItem extends Component {

	state = {
   		hasError: false
  	};



	componentDidMount() {
    	this.props.readFeedIdAction(this.props.itemId)
  	}



  	componentWillUnmount(){
  		this.props.clearFeedIdAction()
  	}



  	componentDidCatch(error, info) {
	    debugger;

	this.setState({
	      hasError: true
    	});
 	}


 	render() {

		const { loggedInAuth, deleteFeed, feeds, googleAuth } = this.props;

		const { feedIdItem, isFetching } = feeds;

		const { title, createDate, content, _id } = feedIdItem;

		const { token } = googleAuth;

		if (this.state.hasError) {
      		return <ErrorIndicator />
   		}

		const spinner = <div className='jumbotron spinner-item'>{isFetching && <Spinner />}</div>

		const item = <div className='jumbotron feed-item'>
					<h3>{title}</h3>
					<p>{createDate}</p> 
					<p>{content}</p>

					{ loggedInAuth && <Link to={`/feeds/${_id}/edit`} >
										    <button className="btn btn-sm btn-primary btn-feeds-edit">
										    Edit</button>
									  </Link> }

					{ loggedInAuth && <Link to="/feeds" >
											<button className="btn btn-sm btn-primary btn-feeds-delete" 
											  onClick={deleteFeed.bind(null, _id, token)} >Delete</button>
									  </Link> }

					{ !loggedInAuth && <ErrorButton /> }
			</div>



		return(
			<>
			{isFetching && spinner}
			{!isFetching && item}
			</>
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
    readFeedIdAction: (id, token) => dispatch(readFeedId(id, token)),
    clearFeedIdAction: () => dispatch(clearFeedId())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);


