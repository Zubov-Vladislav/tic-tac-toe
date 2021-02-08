import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.scss'
const MainMenu = ({ history }) => {

  const handleLogout = () => {
    Meteor.logout()
  }
  return ( <div className='main-menu'>
      <div className='title'>
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="main-menu__container">
        <Link to={'/create-game'}>
          <button>Create the game</button>
        </Link>
        <Link to={'/join-game'}>
          <button>Join to the game</button>
        </Link>
          <button onClick={handleLogout} className='exit-button'>Logout</button>
      </div>
    </div>
  )
}

export default MainMenu
