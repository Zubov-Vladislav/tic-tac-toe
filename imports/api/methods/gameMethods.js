import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {gameLogic} from '../gameLogic';

import GameCollection from '../../db/collections/GameCollection';


Meteor.methods({
  "games.play"(gameName) {
    check(gameName, String);

    const GameInstance = GameCollection.findOne({name: gameName});

    if (!GameInstance) {

      gameLogic.newGame(gameName);

    } else if (GameInstance.firstPlayerId !== this.userId && GameInstance.secondPlayerId === "") {

      gameLogic.joinGame(GameInstance);

    }
  },

  "games.makeMove"(position) {
    check(position, Number);

    gameLogic.validatePosition(position);
    const GameInstance = GameCollection.findOne({turn: this.userId});

    if (GameInstance !== undefined && (GameInstance.cells[position] === -1)) {
       gameLogic.addNewMove(GameInstance, position);

      if (gameLogic.isGameWasWon()) {
        gameLogic.setGameResult(GameInstance._id, this.userId);
      } else {
        //найти ничью
        if (GameInstance.cells.indexOf(-1) === -1) {
          gameLogic.setGameResult(GameInstance._id, "tie");
        } else {
         gameLogic.updateTurn(GameInstance);
        }
      }
    }
  },

  'games.leaveUser'(userId) {
    console.log('userId', userId)
    const game = GameCollection.findOne(
      {
        $or: [
          {firstPlayerId: userId},
          {secondPlayerId: userId}]
      });
    console.log('game', userId)

    if (!!game) {
      if (game.status !== "waiting" && game.status !== "end") {
        if (game.firstPlayerId === userId) {
          gameLogic.setGameResult(game._id, game.secondPlayerId);
          gameLogic.removePlayer(game._id, "firstPlayerId");
        } else if (game.secondPlayerId === userId) {
          gameLogic.setGameResult(game._id, game.firstPlayerId);
          gameLogic.removePlayer(game._id, "secondPlayerId");
        }
      } else {
        if (game.firstPlayerId === "" || game.secondPlayerId === "") {
          gameLogic.removeGame(game._id);
        } else {
          if (game.firstPlayerId === userId)
            gameLogic.removePlayer(game._id, "firstPlayerId");
          else if (game.secondPlayerId === userId)
            gameLogic.removePlayer(game._id, "secondPlayerId");
        }
      }
    }
  }
});