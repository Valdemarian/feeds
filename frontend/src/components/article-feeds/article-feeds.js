import React from 'react';
import { Link } from 'react-router-dom';

import './article-feeds.css'


const ArticleFeeds = ({ id, feedTitle, feedContent, loggedInAuth, deleteFeed, token }) => {

	const edit = loggedInAuth ? <Editor deleteFeed={deleteFeed} id={id} token={token}/> : null

	return(	
		<div className='jumbotron article-feeds'>
			<Link to={`/feeds/${id}`} className="feed-link">
					<h4>{feedTitle}</h4>
					<p className="feed-content">{feedContent}</p>
					<p className="dotter">...</p>
			</Link>

		 {edit}

		</div> 
	)
}


export default ArticleFeeds;


const Editor = ({ deleteFeed, id, token }) => {
	return(
		<>
			<Link to={`/feeds/${id}/edit`} className="feed-link-edit">
				<i className="fas fa-edit" title="Edit feed" ></i>
			</Link>

			<i className="far fa-trash-alt feed-link-delete" title="Delete feed" 
			onClick={deleteFeed.bind(null, id, token)}></i>
		</>
	)
}
