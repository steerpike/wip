import React from 'react';
import { AuthConsumer } from "./AuthContext";
import { Link } from 'react-router-dom';

export default () => (
    <header>
        <nav className="flex items-center bg-gray-200">
        <AuthConsumer>
            {({ isAuth, logout, user, isAnonymous }) => (
                <div className="flex flex-grow items-center">
                    <h3>
                        <Link to="/">
                        Dashboard
                        </Link>
                    </h3>
                {isAuth &&
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="lg:flex-grow">
                            <Link to="/profile" className="pt-2 px-4 items-center">
                                Profile
                            </Link>
                            <Link 
                            data-test="manuscriptsLink"
                            to="/manuscripts" className="pt-2 px-4 items-center">
                                Manuscripts
                            </Link>
                            {isAnonymous && 
                            <Link 
                            to="/login" className="pt-2 px-4 items-center">
                                Login
                            </Link>
                            }
                        </div>
                        <button 
                        data-test="logoutButton"
                        onClick={logout} className="py-2 px-4 flex items-center">Hello {user.username}</button>
                    </div>       
                }
            </div>
            )}
        </AuthConsumer>
        </nav>
    </header>
)