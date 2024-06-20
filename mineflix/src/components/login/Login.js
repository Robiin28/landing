import React, { useState } from 'react';
import './login.css';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showChangeEmail, setShowChangeEmail] = useState(false); // New state for showing "Change Email" link

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailValid(validateEmail(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
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
        if (validateEmail(email)) {
            setEmailValid(true); // Set emailValid to true if email is valid
            setShowPassword(true); // Show password input
            setShowChangeEmail(true); // Show "Change Email" link
        } else {
            setEmailValid(false); // Set emailValid to false if email is not valid
            setShowPassword(false); // Hide password input
            setShowChangeEmail(false); // Hide "Change Email" link
        }
    };

    const handleResetEmail = () => {
        setShowPassword(false); // Hide password input
        setShowChangeEmail(false); // Hide "Change Email" link again
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate email and password
        if (!validateEmail(email) || !validatePassword(password)) {
            alert('Please enter a valid email and password.');
            return;
        }
        // Proceed with login logic
        props.onLogin(email, password);
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
                            value={email}
                            onChange={handleEmailChange}
                            disabled={showPassword} // Disable email input when password is shown
                            required
                        />
                        {showChangeEmail && (
                            <span className="change-email-text" onClick={handleResetEmail}>
                                Change Email
                            </span>
                        )}
                    </div>
                </div>
                {showPassword && (
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange} // Update password state on change
                                required
                            />
                        </div>
                    </div>
                )}
                <div className="form-actions">
                    {!showPassword && (
                        <button type="button" className="btn" onClick={handleNextClick} disabled={!validateEmail(email)}>
                            Next
                        </button>
                    )}
                    {showPassword && (
                        <button type="submit" className="btn" disabled={!validatePassword(password)}>
                            Login
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
