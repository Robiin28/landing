import React, { useState, useEffect } from 'react';
import './login.css'; // Import the CSS file for this component
import passwordValidator from 'password-validator';


const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    // Use useEffect to set form validity based on email and password
    useEffect(() => {
        const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail);
        const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(enteredPassword);
        setFormIsValid(isEmailValid && isPasswordValid);
    }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const emailBlurHandler = () => {
        setEmailIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail));
    };

    const passwordBlurHandler = () => {
        setPasswordIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(enteredPassword));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            props.onLogin(enteredEmail, enteredPassword);
        } else {
            // Additional validation to handle the case where the user submits without focusing out
            setEmailIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail));
            setPasswordIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(enteredPassword));
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Enter your credentials</p>
            <form className="login-form" onSubmit={submitHandler}>
                <div className={`form-control ${!emailIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        title="Enter a valid email address (e.g., someone@example.com)"
                        placeholder="Enter your email"
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                </div>
                <div className={`form-control ${!passwordIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                        title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit."
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                    />
                </div>
               
             

                <button
                    className={'btn'}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

