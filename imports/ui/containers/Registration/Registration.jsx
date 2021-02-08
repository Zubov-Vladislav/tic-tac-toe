import React, { useMemo, useState } from 'react';
import './Registration.scss'
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { registerValidator } from '../../../../helpers/validators';
import ErrorCard from '../../components/ErrorsCard';

const initialFields = {
  username: '',
  password: '',
  password2: ''
}

const Registration = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  
  const clearErrorMessage = () => {
    setErrorMessage(null);
  }
  
  const submitHandler = async ({ username, password }) => {
    if (password && username) {
      Meteor.call('user.register', {
        username,
        password
      }, (error, result) => {
        setErrorMessage(error.error)
        if(!error) history.push('/login')
      });
    }
  }
  
  const {
    handleChange,
    handleSubmit,
    values: {
      username,
      password,
      password2
    },
    errors,
    clearErrors
  } = useForm(initialFields, submitHandler, registerValidator)
  
  const renderErrors = useMemo(() => {
    return Object.keys(errors).length > 0 && <ErrorCard errors={Object.values(errors)} onClose={clearErrors}/>
  }, [errors])
  
  return ( <div className='registration-container'>
      <div className='title'>
        <h3>Create your account</h3>
      </div>
      {errorMessage &&  <ErrorCard errors={[errorMessage]} onClose={clearErrorMessage}/>}
      {renderErrors}
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='form-field'>
            <label htmlFor='username' className='form-field__label'>Username</label>
            <input
              id='username'
              name='username'
              value={username}
              placeholder='Enter Username'
              onChange={handleChange}
              className={`form-field__input ${errors.username ? 'error' : ''}`}
              required
            />
          </div>
          <div className='form-field'>
            <label htmlFor='password' className='form-field__label'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter Password'
              value={password}
              onChange={handleChange}
              className={`form-field__input ${errors.password ? 'error' : ''}`}
              required
            />
          </div>
          <div className='form-field'>
            <label htmlFor='password2' className='form-field__label'>Repeat Password</label>
            <input
              type='password'
              id='password2'
              name='password2'
              placeholder='Repeat Password'
              value={password2}
              onChange={handleChange}
              className={`form-field__input ${errors.password ? 'error' : ''}`}
              required
            />
          </div>
          
          <div className='form-field'>
            <button className='form-field__button' type='submit'
                    disabled={!( username && password && password2 )}>Register
            </button>
          </div>
        </div>
      </form>
      <span className='registration-callout'>
        You already have an account?
        <Link to='/login'>Login</Link>
      </span>
    </div>
  )
}

export default Registration
