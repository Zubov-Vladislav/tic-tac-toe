import React from 'react';
import {Meteor} from "meteor/meteor";
import useForm from "../../hooks/useForm";
import './GameCreator.scss'

const GameCreator = ({history}) => {
  const initialFields = {
    gameName: ''
  }

  const submitHandler = ({gameName}) => {
   history.push(`game/${gameName}`)
  }

  const {
    handleChange,
    handleSubmit,
    values: {
      gameName,
    },
  } = useForm(initialFields, submitHandler)


  return <div className="game-creator">
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-container'>
        <div className='form-field'>
          <label htmlFor='gameName' className='form-field__label'>Game Name</label>
          <input
            id='gameName'
            name='gameName'
            value={gameName}
            placeholder='Enter Game Name'
            onChange={handleChange}
            className={`form-field__input`}
            required
          />
        </div>

        <div className='form-field'>
          <button className='form-field__button' type='submit' disabled={!gameName}>Create Game</button>
        </div>
      </div>
    </form>
  </div>
}

export default GameCreator