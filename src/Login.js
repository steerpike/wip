import React from 'react'
import { AuthConsumer } from "./AuthContext";
import { Redirect } from 'react-router-dom';

const Login = () => (
  <div>
    <h2>Login Page</h2>
    <AuthConsumer>
            {({ isAuth, login }) => (
                <div>
                {!isAuth ? (
                    <div>
                    <label>Username</label>
                    <input type="text" id="username" />
                    <label> Password</label>
                    <input type="password" id="password" />
                    <button onClick={() => {login(document.getElementById('username').value, document.getElementById('password').value)}}>login</button>
                    </div>
                ):(<Redirect to="/"/>)}
                </div>
            )}
    </AuthConsumer>
  </div>
)

export default Login