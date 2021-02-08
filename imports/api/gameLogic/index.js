import GameCollection from '../../db/collections/GameCollection';

class GameLogic {
  constructor(Games) {
    this.Games = Games;
  }

  newGame(gameName) {
    if (!this.userIsPlaying()) {
      this.Games.insert({
        name: gameName,
        firstPlayerId: Meteor.userId(),
        secondPlayerId: "",
        cells: [
          -1, -1, -1,
          -1, -1, -1,
          -1, -1, -1,
        ],
        status: "waiting",
        turn: "",
        result: ""
      });
    }
  }

  userIsPlaying() {
    const currentGame = this.Games.findOne({
      $or: [
        {firstPlayerId: Meteor.userId()},
        {secondPlayerId: Meteor.userId()}]
    })

    return !!currentGame
  }

  joinGame(GameInstance) {
    if (!GameInstance.secondPlayerId) {
      this.Games.update(
        {_id: GameInstance._id},
        {
          $set: {
            secondPlayerId: Meteor.userId(),
            turn: GameInstance.firstPlayerId,
            status: "processing"
          }
        }
      )
    }
  }

  validatePosition(position) {
    const validationFunctions = [
      (position) => position >= 0 && position < 9,
      (position) => typeof position === 'number',
    ]
    const isValid = validationFunctions.reduce((acc, func) => {
      return acc && func(position)
    }, true)
  console.log(isValid)
    if (!isValid) throw new Meteor.Error('invalid-position')
    return isValid
  }

  setGameResult(gameId, result) {
    this.Games.update(
      {_id: gameId},
      {
        $set: {
          "result": result,
          "status": "end"
        }
      }
    );
  }

  addNewMove(GameInstance, position) {
    if (GameInstance.turn === Meteor.userId()) {
      const {cells} = GameInstance;
      cells[position] = Meteor.userId();

      this.Games.update(
        {turn: Meteor.userId()},
        {
          $set: {
            cells: cells
          }
        }
      );
    }

  }

  updateTurn(GameInstance) {
    let nextPlayer;

    if (GameInstance.firstPlayerId === Meteor.userId())
      nextPlayer = GameInstance.secondPlayerId;
    else
      nextPlayer = GameInstance.firstPlayerId;

    this.Games.update(
      {turn: Meteor.userId()},
      {
        $set: {
          turn: nextPlayer
        }
      }
    );
  }

  isGameWasWon() {
    const game = this.Games.findOne({turn: Meteor.userId()});
    if (!game) {
      throw new Meteor.Error('game not found')
    }
    const {cells} = game;

    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return wins.some(winCells => {
      return cells[winCells[0]] !== -1
        && cells[winCells[0]] === cells[winCells[1]]
        && cells[winCells[1]] === cells[winCells[2]];
    })
  }


  removeGame(gameId) {
    this.Games.remove({_id: gameId});
  }

  removePlayer(gameId, player) {
    this.Games.update({_id: gameId}, {$set: {[player]: ""}});
  }
}

export const gameLogic = new GameLogic(GameCollection);