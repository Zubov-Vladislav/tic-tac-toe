import { Meteor } from 'meteor/meteor';
import { startUpCreateUser } from "./user";
import '/imports/api/methods/gameMethods';
import '/imports/api/methods/userMethods';
import '/imports/api/publications/gamePublications';
import '/imports/api/publications/userPublications';

startUpCreateUser(Meteor)
