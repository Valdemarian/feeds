import React, { Component } from 'react';
import { connect } from 'react-redux';


import News from './components/news';
import Header from './components/header';
import Form from './components/form';
import Profile from './components/profile';
import Feeds from './components/feeds';
import FeedItem from './components/feed-item';
import EditFeed from './components/edit-feed';


import { handleLogin, loginOut, loginAuthIn, loginAuthOut } from './actions/user-action';

import { deleteFeed, readFeedId } from './actions/feed-action';

import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

class App extends Component {

  render() {

    const { handleLoginAction, auth, loginOutAction, loginAuthInAction, loginAuthOutAction, 
      feeds, editFeedAction, deleteFeedAction, readFeedIdAction  } = this.props

    const { loggedInAuth } = auth;


    return (

      <div className="App container">
         <Header  loginAuthIn={loginAuthInAction}
                  loginAuthOut={loginAuthOutAction} />

        <Switch>
          <Route  path="/feeds" 
                  render={() => <Feeds
                  loggedInAuth={auth.loggedInAuth}
                   />} exact />

          <Route  path="/feeds/:id" 
                  render={({match}) => {
                    const { id } = match.params;
                    return <FeedItem 
                  readFeedId={readFeedIdAction}
                  editFeed={editFeedAction}
                  loggedInAuth={loggedInAuth}
                  deleteFeed={deleteFeedAction} 
                  itemId={id}/>} } exact />

          <Route  path="/feeds/:id/edit" 
                  render={({match}) => {
                    const { id } = match.params;
                    return <EditFeed
                  itemId={id}
                  redirect={feeds.editFeedRedirect}
                  validateEdit={feeds.validateEdit} /> }} />


          <Route  path="/news" 
                  render={ () => <News 
                  data={auth.newsData}
                  loggedIn={auth.loggedIn} /> } />

          <Route  path="/profile" 
                  render={ () => <Profile 
                  loginOutAction={loginOutAction} 
                  data={auth.profileData}
                  loggedIn={auth.loggedIn} />} />

          <Route  path="/login" 
                  render={() => <Form 
                  handleLogin={handleLoginAction} 
                  counter={auth.counter} 
                  loggedIn={auth.loggedIn} />} />

          <Route  render={() => <h1 style={{color: '#4A76A8'}}>Page not found</h1> } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    feeds: state.feeds,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLoginAction: (username, password) => dispatch(handleLogin(username, password)),
    loginOutAction: () => dispatch(loginOut()),
    loginAuthInAction: (userId) => dispatch(loginAuthIn(userId)),
    loginAuthOutAction: () => dispatch(loginAuthOut()),
    deleteFeedAction: (id, token) => dispatch(deleteFeed(id, token)),
    readFeedIdAction: (id) => dispatch(readFeedId(id))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))