import React from 'react';
import { AuthConsumer } from "./AuthContext";
import { Link } from 'react-router-dom';

export default () => (
    <header>
        <AuthConsumer>
            {({ isAuth, login, logout }) => (
                <div>
                <h3>
                    <Link to="/">
                    HOME
                    </Link>
                </h3>

                {isAuth ? (
                    <ul>
                    <Link to="/profile">
                        Profile
                    </Link>
                    <button onClick={logout}>logout</button>
                    </ul>
                ) : (
                    <button onClick={login}>login</button>
                )}
                </div>
            )}
        </AuthConsumer>
    </header>
)