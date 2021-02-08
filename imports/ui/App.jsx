import React, { useEffect, useState } from 'react';
import Login from "./containers/Login";
import Registration from "./containers/Registration";
import MainMenu from "./containers/MainMenu";
import GameCreator from "./containers/GameCreator";

import { useTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './Main.scss'
import Game from "./containers/Game";
import GameConnector from "./containers/GameConnector";
export const App = () => {


  const isUser = useTracker(() => {
    const user = Meteor.user()
    const id = Meteor.userId();
    return !!user || !!id
  });

  return (<div className='app'>
      <Router>
        <Switch>
          {isUser && <Redirect from='/login' to='/'/>}

          <Route exact path='/login' component={Login}/>
          <Route exact path='/registration' component={Registration}/>

          <WithUser
            isUser={isUser}
          >
            <Route exact path='/' component={MainMenu}/>
            <Route exact path='/create-game' component={GameCreator}/>
            <Route exact path='/join-game' component={GameConnector}/>
            <Route exact path='/game/:gameName' component={Game}/>

          </WithUser>
        </Switch>
      </Router>
    </div>
  )
}

const WithUser = ({ isUser, children }) => {
  if (isUser) return children
  return <Redirect from='/*' to="/login"/>
}
