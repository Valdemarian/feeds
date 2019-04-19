import React from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types'

import './news.css'

const News = ({ loggedIn, data }) => {

    if(!loggedIn) {
        return <div><h1 className="news-welcome">Авторизируйтесь для просмотра новостей!</h1></div>
      }


  return(
      <div className="news jumbotron">
        <h1>Welcome to TEST-2</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{data[0].title}</h3>
        <p>{data[0].text}</p>

        <br />
        <hr />
        <br />

        <h3>{data[1].title}</h3>
        <p>{data[1].text}</p>
        <h4>Всего новойстей: {data.length}</h4>
      </div>
      
    )
}

export default News;


News.propTypes = {
  data: PropTypes.array
}