import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simple-schema';

const GamesCollection = new Mongo.Collection('games');

// Define schema
GamesCollection.schema = new SimpleSchema({
  // _id auto generated

  // Game users
  firstUserId: {type: String},
  secondUserId: {type: String},

  // user's id
  turn: {type: String},

  name: {
    type: String
  },

  status: {
    type: String
  },

  cells: {
    type: Array
  },
  'cells.$': Number,

  result: {
    type: String
  }
});

// Finally, export the Collection
export default GamesCollection;