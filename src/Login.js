import React from 'react'
import { AuthConsumer } from "./AuthContext";

const Login = () => (
  <div>
    <h2>Login Page</h2>
    <AuthConsumer>
            {({ isAuth, login }) => (
                <div>
                {!isAuth &&
                    <div>
                    <label>Username</label>
                    <input type="text" id="username" />
                    <label> Password</label>
                    <input type="password" id="password" />
                    <button onClick={() => {login(document.getElementById('username').value, document.getElementById('password').value)}}>login</button>
                    </div>
                }
                </div>
            )}
    </AuthConsumer>
  </div>
)

export default Login