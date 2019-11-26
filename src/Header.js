import React from 'react';
import { AuthConsumer } from "./AuthContext";
import { Link } from 'react-router-dom';

export default () => (
    <header>
        <nav className="flex items-center justify-between px-4 py-2"> 
            <div className="leading-none">
                <span className="uppercase text-sm">Words<br /> in<br /> Progress<br /></span>
            </div>
            <div>
                <button className="block">
                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                    </svg>
                </button>
            </div>
        </nav>
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