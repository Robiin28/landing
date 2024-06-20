import React,{useState,useEffect} from 'react';

let AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: undefined,
    onLogin:undefined
});
export function AutoContextprovider(props){
   
    const [isLoggedIn, updateIsLoggedIn] = useState(false);
      // Check if user was logged in from localStorage on initial load
      useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            updateIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        updateIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logoutHandler = () => {
        updateIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    };

    return<AuthContext.Provider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler,onLogin:loginHandler}}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;
