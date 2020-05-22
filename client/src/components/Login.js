import React, { useState } from "react";
import { useHistory } from 'react-router'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initCred = {
  username: '',
  password: '',
}

const Login = () => {
  const history = useHistory()
  const [cred, setCred] = useState(initCred)

  const handleChanges = e => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    //Post request
    axiosWithAuth()
      .post('api/login', cred)
      .then(res => {
        //Save token
        localStorage.setItem('token', res.data.payload)
        history.push('/bubbles')
      })
      .catch(err => console.log(err))
    
    //redirect user
  }




  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          name='username'
          id='username'
          value={cred.username}
          onChange={handleChanges}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={cred.password}
          onChange={handleChanges}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
