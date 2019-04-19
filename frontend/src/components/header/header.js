import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../auth';

import './header.css'

const Header = ({ loginAuthIn, loginAuthOut  }) => {

	return(
	  	<div className="header d-flex">
	  		<div className="d-flex menu" >

		  		<Link to="/feeds"><h2 className="nav-feed">Feeds</h2></Link>

			  	<ul className="d-flex str">
			    	<Link to="/news" className="nav-li"><li>News</li></Link>
			      	<Link to="/profile" className="nav-li"><li>Profile</li></Link>
			    </ul>

		    </div>

		    <div className="autharization">
		    	<Auth loginAuthIn={loginAuthIn}
		    		  loginAuthOut={loginAuthOut} />
		    </div>
	 	</div>
	)
}


export default Header;