import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Login = () => {

  //* History
  const history = useHistory()

  //* State
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  })

  //* Functions 
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setTokenToLocalStorage(data.token)
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="loginPage">

      <div className="form-header">
        <h2>Login to your account.</h2>
        <h3>Don't have an account? 
          <a href="/signup"> Get one here.</a> 
        </h3> 
        </div>

        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="formfield">
            <p>Email</p>
            <input onInput={handleChange} type="email" name="email" value={formData.email} placeholder="Your email goes here"/>
          </div>
          <div className="formfield">
            <p>Password</p>
            <input onInput={handleChange} type="password" name="password" value={formData.password} placeholder="Your email goes here"/>
          </div>
          <button className="form-button">LOGIN</button>
        </form>    
        </div>

      </div>
    </>
  )
}

export default Login