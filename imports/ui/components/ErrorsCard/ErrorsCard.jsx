import React  from 'react';
import './ErrorCard.scss'

const ErrorCard = ({ errors, onClose }) => {
  if (errors.length !== 0)
    return (
      <div className='error-container'>
        <ul>
          {errors.map((err, index) => <li key={`error-item'-${err}`} className='error-item'>{err}</li>)}
        </ul>
        <button onClick={onClose}>x</button>
      </div> )
}

export default ErrorCard
