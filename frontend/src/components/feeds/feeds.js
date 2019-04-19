import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArticleFeeds from '../article-feeds';

import { feedsDataLoading, addFeed, deleteFeed, 
		addFeedTrue, addFeedFalse } from '../../actions/feed-action';

import AddFeed from '../../components/add-feed';
import Spinner from '../../components/spinner';

import './feeds.css'

class Feeds extends Component {

	componentDidMount() {
    	this.props.feedsDataLoadingAction()
  	}

	render(){
	  	const { auth, feeds, googleAuth, addFeedAction, deleteFeedAction, 
	  		addFeedFalseAction, addFeedTrueAction } = this.props;
		const { feedsData, isFetching, validateAddFeed, addFeedState } = feeds;
		const { loggedInAuth } = auth;
		const { token } = googleAuth;

		const addCreatFeed = loggedInAuth ? <Feed addFeed={addFeedAction}
												  addFeedState={addFeedState} 
												  validateAddFeed={validateAddFeed}
												  addFeedTrue={addFeedTrueAction}
												  addFeedFalse={addFeedFalseAction}
												  token={token} /> : null 

		const articleFeedsReverse = feedsData.map(feed => 
								<ArticleFeeds
									loggedInAuth={loggedInAuth}
									feedTitle={feed.title}
									deleteFeed={deleteFeedAction}
									feedContent={feed.content}
									date={feed.createDate}
									name={feed.creator.displayName}
									key={feed._id}
									id={feed._id}
									token={token}
								/>
						)

		const spinner = <div className='jumbotron spinner-item'>{isFetching && <Spinner />}</div>

		const noFeeds = feedsData.length === 0 && !isFetching ? <h1 style={{color: '#4A76A8', height: '60px',
		marginTop: '60px'}}>Новостей нету</h1> : null

		
		return(

			<>
			{isFetching && spinner}

			{!isFetching && <div className="container d-flex feeds-container">

								{addCreatFeed}

								{articleFeedsReverse.reverse()}

								{noFeeds}

							</div> 
			}

			</>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    feeds: state.feeds,
    auth: state.auth,
    googleAuth: state.googleAuth
  }
}


const mapDispatchToProps = dispatch => {
  return {
    feedsDataLoadingAction: () => dispatch(feedsDataLoading()),
    addFeedAction: (title, content, token) => dispatch(addFeed(title, content, token)),
    deleteFeedAction: (id, token) => dispatch(deleteFeed(id, token)),
    addFeedTrueAction: () => dispatch(addFeedTrue()),
    addFeedFalseAction: () => dispatch(addFeedFalse())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Feeds);


const Feed = ({ addFeed, addFeedState, validateAddFeed, addFeedTrue, addFeedFalse, token }) => {

	return (   
	 	<>
			{addFeedState ? 
			<AddFeed addFeed={addFeed}
					 validateAddFeed={validateAddFeed}
					 addFeedFalse={addFeedFalse}
					 token={token} /> : 
			<button  className="btn btn-primary btn-create-feed" 
					 onClick={addFeedTrue}><h3>Add Feed +</h3></button>} 
	   	</>
	)
}



Feeds.propTypes = {
  feedsData: PropTypes.array
}

