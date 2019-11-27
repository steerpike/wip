import React, {useState} from 'react';
import { AuthConsumer } from "./AuthContext";
import { Link } from 'react-router-dom';

export default function Header(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
        return (
        <header>
            <nav className="flex items-center justify-between px-4 py-2"> 
                <div className="leading-none">
                    <span className="uppercase text-sm"><Link to="/">Words<br /> in<br /> Progress<br /></Link></span>
                </div>
                <div>Title</div>
                <div>
                    <button onClick={toggleMenu} className="block">
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            {isMenuOpen? (
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            ):(
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>
            <div>
                <AuthConsumer>
                {({ isAnonymous }) => (
                    <div>
                    {isMenuOpen &&
                        <div className="px-2 pt-2 pb-4 text-right">
                                <Link to="/profile" className="block px-2 py-1">
                                    Profile
                                </Link>
                                <Link 
                                data-test="manuscriptsLink"
                                className="block mt-1 px-2 py-1"
                                to="/manuscripts">
                                    Manuscripts
                                </Link>
                                {isAnonymous && 
                                <Link 
                                to="/login" className="block mt-1 px-2 py-1">
                                    Login
                                </Link>
                                }
                            </div>
                    }
                    </div>
                )}               
                </AuthConsumer>
            </div>
            
        </header>
    )
}