import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check';

Meteor.methods({
  'user.register'({username, password }) {
    check(username, String);
    check(password, String);
    
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password
      });
    } else {
      throw new Meteor.Error('Already registered');
    }
  }
})
