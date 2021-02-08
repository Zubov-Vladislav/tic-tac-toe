import React from 'react';
import './UserCard.scss'
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

const UserCard = ({userId}) => {

  const {user, isLoading} = useTracker(() => {
    const noDataAvailable = {user: ''};
    if (!Meteor.user) return noDataAvailable;

    const handlerUserData = Meteor.subscribe('userData');

    if (!handlerUserData.ready()) {
      return {...noDataAvailable, isLoadingGame: true}
    }

    const user = Meteor.users.findOne({_id: userId})

    return {user}
  })
  if (isLoading) return (<span>loading...</span>)
  return (<span>{user?.username}</span>)
}

export default UserCard
