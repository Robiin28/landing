import React, { useState, useContext, useRef } from 'react';
import './login.css';
import AuthContext from '../context/AuthContext';
import Input from '../input/Input';

const Login = () => {
    const authContext = useContext(AuthContext);

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true); // State to track password validity
    const [showPassword, setShowPassword] = useState(false);
    const [showChangeEmail, setShowChangeEmail] = useState(false);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailValid(true); // Reset validity state when typing
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordValid(true); // Reset validity state when typing
    };

    const handleEmailBlur = () => {
        if (!validateEmail(email)) {
            setEmailValid(false);
        }
    };

    const handlePasswordBlur = () => {
        if (!validatePassword(password)) {
            setPasswordValid(false);
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    };

    const handleNextClick = () => {
        if (validateEmail(email)) {
            setEmailValid(true);
            setShowPassword(true);
            setShowChangeEmail(true);
            if (passRef.current) {
                passRef.current.focus();
            }
        } else {
            setEmailValid(false);
            setShowPassword(false);
            setShowChangeEmail(false);
            if (emailRef.current) {
                emailRef.current.focus();
            }
        }
    };

    const handleResetEmail = () => {
        setShowPassword(false);
        setShowChangeEmail(false);
        if (emailRef.current) {
            emailRef.current.focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email) || !validatePassword(password)) {
            alert('Please enter a valid email and password.');
            return;
        }
        authContext.onLogin(email, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p>Enter your credentials</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <Input
                    ref={emailRef}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeHandler={handleEmailChange}
                    onBlurHandler={handleEmailBlur} // Handle blur event for email
                    showChangeLink={showChangeEmail}
                    onReset={handleResetEmail}
                    label="Email"
                    disabled={showPassword}
                    isValid={emailValid} // Pass validity state for styling
                />
                {showPassword && (
                    <Input
                        ref={passRef}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeHandler={handlePasswordChange}
                        onBlurHandler={handlePasswordBlur} // Handle blur event for password
                        label="Password"
                        isValid={passwordValid} // Pass validity state for styling
                    />
                )}
                <div className="form-actions">
                    {!showPassword && (
                        <button type="button" className="btn" onClick={handleNextClick}>
                            Next
                        </button>
                    )}
                    {showPassword && (
                        <button type="submit" className="btn">
                            Login
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
