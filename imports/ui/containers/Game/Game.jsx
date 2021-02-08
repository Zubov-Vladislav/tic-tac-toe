import React, {useState, useEffect} from 'react';
import {Meteor} from "meteor/meteor";
import useForm from "../../hooks/useForm";
import './Game.scss'
import {useTracker} from 'meteor/react-meteor-data';
import GameCollection from "../../../db/collections/GameCollection";
import {
  useParams
} from "react-router-dom";
import UserCard from "../../components/UserCard";
import {generateKey} from "../../../../helpers";

const Game = ({history}) => {
  let {gameName} = useParams();

  const {game, users, isLoadingGame} = useTracker(() => {
    const noDataAvailable = {game: {}, users: {}};
    if (!Meteor.user) return noDataAvailable;

    const handlerGames = Meteor.subscribe('games');

    if (!handlerGames.ready()) {
      return {...noDataAvailable, isLoadingGame: true}
    }

    Meteor.call('games.play', gameName)

    const game = GameCollection.findOne({name: gameName})

    return {game}
  })

  const handleCell = (cell) => () => {
    Meteor.call('games.makeMove', cell)
  }

  const renderHints = () => {
    const {firstPlayerId, secondPlayerId, status, turn, result} = game;
    if (status !== 'end') {
      if (!turn) return 'Waiting opponent'
      return turn === Meteor.userId() ? "You're turn" : "Opponent's turn"
    } else {
      if (result === Meteor.userId()) return `You win`
      else if (result !== firstPlayerId && result !== secondPlayerId) return `It's a tie`
      return `You lose`
    }
  }

  const renderRow = (sum) => (<div className="game-container__table__row">
    {game.cells?.splice(0, 3).map((cell, index) => (
      <div key={generateKey(`cell-${index}-${sum}-`)} onClick={handleCell(index + sum)} className="game-container__table__row__cell">
        {cell === game.firstPlayerId ? 'X'
          : cell === game.secondPlayerId ? 'O' : ''}
      </div>))}
  </div>)

  const handleExit = () => {
    Meteor.call('games.leaveUser', Meteor.userId(), (error) => {
      if (!error) history.push('/')
    })
  }

  const renderTable = () => {
    return <div className="game-container__table">
      {renderRow(0)}
      {renderRow(3)}
      {renderRow(6)}
    </div>
  }

  return <div className="game">
    <div className='game-container'>
      {game && (
        <>
          <div className='game-container__name'>
            To connect: <h2>{game.name}</h2>
          </div>

          <div className='game-container__users'>
            <UserCard userId={game.firstPlayerId}/>
            <UserCard userId={game.secondPlayerId}/>
          </div>
          {renderTable()}
          <div className="game-container__hints">{renderHints()}</div>
        </>)}
      <button onClick={handleExit} className="game-container__btn">Exit</button>
    </div>
  </div>
}

export default Game