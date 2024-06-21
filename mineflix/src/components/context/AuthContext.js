import React, { useState, useEffect } from 'react';
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});
export function AuthContextProvider(props) {
    const [isLoggedIn, updateIsLoggedIn] = useState(false);
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            updateIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        console.log(`Logging in with email: ${email}`);
        updateIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logoutHandler = () => {
        updateIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn:isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
