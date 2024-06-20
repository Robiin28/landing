import React, { useState, useReducer, useEffect } from 'react';
import './login.css';

// Reducer functions to handle input state and validation
function emailReducer(state, action) {
    switch (action.type) {
        case 'EMAIL_INPUT':
            return { value: action.val, isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.val) };
        default:
            return state;
    }
}

function passwordReducer(state, action) {
    switch (action.type) {
        case 'PASS_INPUT':
            return { value: action.val, isValid: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(action.val) };
        default:
            return state;
    }
}

const Login = (props) => {
    const [emailState, emailDispatcher] = useReducer(emailReducer, { value: '', isValid: false });
    const [passState, passwordDispatcher] = useReducer(passwordReducer, { value: '', isValid: false });
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        // Update form validity whenever email or password validity changes
        setFormIsValid(emailState.isValid && passState.isValid);
    }, [emailState.isValid, passState.isValid]);

    const emailChangeHandler = (event) => {
        const value = event.target.value;
        emailDispatcher({ val: value, type: 'EMAIL_INPUT' });
    };

    const passwordChangeHandler = (event) => {
        const value = event.target.value;
        passwordDispatcher({ val: value, type: 'PASS_INPUT' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        emailDispatcher({ type: 'EMAIL_INPUT', val: emailState.value }); // Trigger email validation
        passwordDispatcher({ type: 'PASS_INPUT', val: passState.value }); // Trigger password validation

        if (emailState.isValid && passState.isValid) {
            props.onLogin(emailState.value, passState.value);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Enter your credentials</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className={`form-control ${emailState.isValid === false && emailState.value !== '' ? 'invalid' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={emailChangeHandler}
                        value={emailState.value}
                        onBlur={() => emailDispatcher({ type: 'EMAIL_INPUT', val: emailState.value })}
                        required
                    />
                </div>
                <div className={`form-control ${passState.isValid === false && passState.value !== '' ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={passwordChangeHandler}
                        value={passState.value}
                        onBlur={() => passwordDispatcher({ type: 'PASS_INPUT', val: passState.value })}
                        required
                    />
                </div>
                <button className={'btn'} type="submit" disabled={!formIsValid}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
