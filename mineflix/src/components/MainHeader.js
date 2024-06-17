const MainHeader=(props)=>{

return 
<>

<span>User</span>
<span>Admin</span>
<span>Login</span>

<main>
                {!props.isAuthenticated ? (
                    <Login onLogin={loginHandler} />
                ) : (
                    <Home onLogout={logoutHandler} />
                )}
           </main> 
</>n

}
export default MainHeader;