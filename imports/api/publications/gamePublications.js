import { Meteor } from 'meteor/meteor';
import GameCollection from "../../db/collections/GameCollection";

Meteor.publish('games', function publishGames() {
  return GameCollection.find({})
})
