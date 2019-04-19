import React from 'react';
import { Redirect } from 'react-router-dom'
import './profile.css';

const Profile = ({ loggedIn, loginOutAction, data }) => {

	if(!loggedIn) {
		return <Redirect to="/login" />
	}

	return (
		<div className="jumbotron profile">
			<h1>Profile</h1>

			<p>Город: {data.city}</p>

			<p>Знание языков:</p>
			<p>{data.languages[0]}</p>
			<p>{data.languages[1]}</p>

			<p><a href={data.social[0].link}>{data.social[0].label}</a></p>

			<p><a href={data.social[1].link}>{data.social[1].label}</a></p>

			<p><a href={data.social[2].link}>{data.social[2].label}</a></p>

			<p><a href={data.social[3].link}>{data.social[3].label}</a></p>

			<p><a href={data.social[4].link}>{data.social[4].label}</a></p>

			<p><a href={data.social[5].link}>{data.social[5].label}</a></p>

	        <div>
	          <br />
	            <button type="submit" 
	                    className="btn btn-primary btn-sm btn-profile"
	                    onClick={loginOutAction}>Выйти</button>
	        </div>
	    </div>
	)
}

export default Profile;
