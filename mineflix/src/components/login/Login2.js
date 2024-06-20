import React, { useReducer } from 'react';
import './login.css';

const initialState = {
    email: '',
    password: '',
    emailValid: false,
    showPassword: false,
    showChangeEmail: false,
};

const actionTypes = {
    SET_EMAIL: 'SET_EMAIL',
    SET_PASSWORD: 'SET_PASSWORD',
    SET_EMAIL_VALID: 'SET_EMAIL_VALID',
    SET_SHOW_PASSWORD: 'SET_SHOW_PASSWORD',
    SET_SHOW_CHANGE_EMAIL: 'SET_SHOW_CHANGE_EMAIL',
    RESET_STATE: 'RESET_STATE',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_EMAIL:
            return { ...state, email: action.payload };
        case actionTypes.SET_PASSWORD:
            return { ...state, password: action.payload };
        case actionTypes.SET_EMAIL_VALID:
            return { ...state, emailValid: action.payload };
        case actionTypes.SET_SHOW_PASSWORD:
            return { ...state, showPassword: action.payload };
        case actionTypes.SET_SHOW_CHANGE_EMAIL:
            return { ...state, showChangeEmail: action.payload };
        case actionTypes.RESET_STATE:
            return initialState;
        default:
            return state;
    }
};

const Login = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        dispatch({ type: actionTypes.SET_EMAIL, payload: value });
        dispatch({ type: actionTypes.SET_EMAIL_VALID, payload: validateEmail(value) });
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        dispatch({ type: actionTypes.SET_PASSWORD, payload: value });
    };

    const validateEmail = (email) => {
        // Basic email validation using regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        // Password validation using regex
        // Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    };

    const handleNextClick = () => {
        if (validateEmail(state.email)) {
            dispatch({ type: actionTypes.SET_EMAIL_VALID, payload: true });
            dispatch({ type: actionTypes.SET_SHOW_PASSWORD, payload: true });
            dispatch({ type: actionTypes.SET_SHOW_CHANGE_EMAIL, payload: true });
        } else {
            dispatch({ type: actionTypes.SET_EMAIL_VALID, payload: false });
            dispatch({ type: actionTypes.SET_SHOW_PASSWORD, payload: false });
            dispatch({ type: actionTypes.SET_SHOW_CHANGE_EMAIL, payload: false });
        }
    };

    const handleResetEmail = () => {
        dispatch({ type: actionTypes.SET_SHOW_PASSWORD, payload: false });
        dispatch({ type: actionTypes.SET_SHOW_CHANGE_EMAIL, payload: false });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate email and password
        if (!validateEmail(state.email) || !validatePassword(state.password)) {
            alert('Please enter a valid email and password.');
            return;
        }
        // Proceed with login logic
        props.onLogin(state.email, state.password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Enter your credentials</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <div className="email-input">
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={state.email}
                            onChange={handleEmailChange}
                            disabled={state.showPassword} // Disable email input when password is shown
                            required
                        />
                        {state.showChangeEmail && (
                            <span className="change-email-text" onClick={handleResetEmail}>
                                Change Email
                            </span>
                        )}
                    </div>
                </div>
                {state.showPassword && (
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={state.password}
                                onChange={handlePasswordChange} // Update password state on change
                                required
                            />
                        </div>
                    </div>
                )}
                <div className="form-actions">
                    {!state.showPassword && (
                        <button type="button" className="btn" onClick={handleNextClick} disabled={!state.emailValid}>
                            Next
                        </button>
                    )}
                    {state.showPassword && (
                        <button type="submit" className="btn" disabled={!validatePassword(state.password)}>
                            Login
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
