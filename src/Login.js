import React from 'react'
import { AuthConsumer } from "./AuthContext";
import { Redirect } from 'react-router-dom';

const Login = () => (
  <div>
    <h2>Login Page</h2>
    <AuthConsumer>
            {({ isAnonymous, login, register, error }) => (
                <div>
                  {error && <p>{error}</p>}
                  {isAnonymous ? (
                      <div>
                      <label>Email</label>
                      <input 
                      data-test="username"
                      type="text" id="username" />
                      <label> Password</label>
                      <input 
                      data-test="password"
                      type="password" id="password" />
                      <button 
                      data-test="loginButton"
                      onClick={() => {login(document.getElementById('username').value, document.getElementById('password').value)}}>login</button>
                      <button 
                      data-test="registerButton"
                      onClick={() => {register(document.getElementById('username').value, document.getElementById('password').value)}}>register</button>
                      </div>
                  ):(<Redirect to="/"/>)}
                </div>
            )}
    </AuthConsumer>
  </div>
)

export default Login