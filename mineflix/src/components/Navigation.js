import React, { useContext } from 'react';
import './Navigation.css'; // Make sure the CSS is correctly linked
import AuthContext from './context/AuthContext';

const Navigation = () => {
    const authContext = useContext(AuthContext);

    return (
        <nav className="main-navigation">
            <ul>
                {authContext.isLoggedIn && (
                    <>
                        <li>
                            <a href="/">Users</a>
                        </li>
                        <li>
                            <a href="/">Admin</a>
                        </li>
                        <li>
                            <button onClick={authContext.onLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
