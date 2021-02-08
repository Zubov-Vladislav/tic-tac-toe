import React, { useMemo, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import './Login.scss'
import { Link } from 'react-router-dom';
import useForm from "../../hooks/useForm";
import ErrorCard from "../../components/ErrorsCard";

const initialFields = {
  username: '',
  password: ''
}

const Login = ({ history }) => {
  const [ error, setError ] = useState(null)
  
  const clearError = () => {
    setError(null)
  }
  const submitHandler = async ({ username, password }) => {
    if (password && username) {
      await Meteor.loginWithPassword(username, password, (error) => {
        if (error) setError('Incorrect username or password.')
        else history.push('/')
      });
    }
  }
  const {
    handleChange,
    handleSubmit,
    values: {
      username,
      password,
    },
  } = useForm(initialFields, submitHandler)
  
  const renderErrors = useMemo(() => {
    return !!error && <ErrorCard errors={[ error ]} onClose={clearError}/>
  }, [ error ])
  
  
  return ( <div className='login-container'>
      <div className='title'>
        <h3>Welcome Back</h3>
      </div>
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
              className={`form-field__input ${error ? 'error' : ''}`}
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
              className={`form-field__input ${error ? 'error' : ''}`}
              required
            />
          </div>
          
          <div className='form-field'>
            <button className='form-field__button' type='submit' disabled={!( username && password )}>Login</button>
          </div>
        </div>
      </form>
      <span className='login-callout'>
        New to Tic Tac Toe?
        <Link to='/registration'>Create an account</Link></span>
    </div>
  )
}

export default Login
