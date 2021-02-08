import { Accounts } from 'meteor/accounts-base'

export const USER = {
  username: 'user',
  password: 'user'
}

export const startUpCreateUser = (Meteor) => Meteor.startup(() => {
  if (!Accounts.findUserByUsername(USER.username)) {
    Accounts.createUser(USER);
  }
})
