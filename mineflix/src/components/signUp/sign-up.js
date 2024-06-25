import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../login/login.css'; // Import the CSS file for this component
import passwordValidator from 'password-validator';
import './passwordStrengthMeter.css'; // Import CSS for PasswordStrengthMeter
import Validate from './Validate'; // Import the Validate component

// Define the schema for password validation
const schema = new passwordValidator();
schema
  .is().min(8)           // Minimum length 8
  .is().max(100)         // Maximum length 100
  .has().uppercase()     // Must have uppercase letters
  .has().lowercase()     // Must have lowercase letters
  .has().digits()        // Must have digits
  .has().symbols()       // Must have symbols
  .has().not().spaces(); // Should not have spaces

const SignUp = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const conPassRef = useRef();

    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [nameIsValid, setNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [confirmedPasswordIsValid, setConfirmedPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [signedUp, setSignedUp] = useState(false); // Track signup success

    useEffect(() => {
        const isNameValid = /^[A-Za-z][A-Za-z0-9]{6,}$/.test(enteredName);
        const isEmailValid = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail);
        const isPasswordValid = schema.validate(enteredPassword);
        const isConfirmedPasswordValid = enteredPassword === confirmedPassword;
        setFormIsValid(isNameValid && isEmailValid && isPasswordValid && isConfirmedPasswordValid);
    }, [enteredName, enteredEmail, enteredPassword, confirmedPassword]);

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleNameBlur = () => {
        setNameIsValid(/^[A-Za-z][A-Za-z0-9]{6,}$/.test(enteredName));
    };

    const handleEmailBlur = () => {
        setEmailIsValid(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail));
    };

    const handlePasswordBlur = () => {
        setPasswordIsValid(schema.validate(enteredPassword));
    };

    const handleConfirmedPasswordBlur = () => {
        setConfirmedPasswordIsValid(enteredPassword === confirmedPassword);
    };

    const handlePasswordChange = (event) => {
        setEnteredPassword(event.target.value);
        setConfirmedPasswordIsValid(event.target.value === confirmedPassword);
    };

    const handleConfirmedPasswordChange = (event) => {
        setConfirmedPassword(event.target.value);
        setConfirmedPasswordIsValid(enteredPassword === event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const newUser = {
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: confirmedPassword
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/signup', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Sign-up successful:', response.data);
            setSignedUp(true); // Set signedUp to true upon successful signup
            setServerError(null);
        } catch (error) {
            if (error.response) {
                console.error('Sign-up failed:', error.response.data);
                setServerError(error.response.data.message || 'Unknown error');
            } else if (error.request) {
                console.error('Sign-up failed: No response received', error.request);
                setServerError('Network error');
            } else {
                console.error('Sign-up failed:', error.message);
                setServerError('Unknown error');
            }
        }
    };

    if (signedUp) {
        return <Validate email={enteredEmail} />; // Render Validate component upon successful signup
    }

    const calculatePasswordStrength = (password) => {
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[\W_]/)) strength += 25;
        if (strength > 100) strength = 100;

        return strength;
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength >= 75) return 'green';
        if (strength >= 50) return 'orange';
        if (strength >= 25) return 'yellow';
        return 'red';
    };

    const passwordStrength = calculatePasswordStrength(enteredPassword);
    const passwordStrengthColor = getPasswordStrengthColor(passwordStrength);

    return (
        <div className="login-container">
            <h2>Sign-up</h2>
            <p>Fill your credentials</p>
            <form className="login-form" onSubmit={submitHandler}>
                <div className={`form-control ${!nameIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        ref={nameRef}
                        title="Enter a valid name (e.g., JohnDoe123)"
                        placeholder="Enter your name"
                        onChange={handleChange(setEnteredName)}
                        onBlur={handleNameBlur}
                        value={enteredName}
                    />
                    {!nameIsValid && <p className="error-text">Please enter a valid name.</p>}
                </div>
                <div className={`form-control ${!emailIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        ref={emailRef}
                        title="Enter a valid email address (e.g., someone@example.com)"
                        placeholder="Enter your email"
                        onChange={handleChange(setEnteredEmail)}
                        onBlur={handleEmailBlur}
                        value={enteredEmail}
                    />
                    {!emailIsValid && <p className="error-text">Please enter a valid email address.</p>}
                </div>
                <div className={`form-control ${!passwordIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        ref={passRef}
                        placeholder="Enter your password"
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        value={enteredPassword}
                    />
                    <div className="password-strength-meter">
                        <div className="password-strength-bar">
                            <div
                                className="password-strength-meter-fill"
                                style={{ width: `${passwordStrength}%`, backgroundColor: passwordStrengthColor }}
                            />
                        </div>
                        <span className={`password-strength-text ${passwordIsValid ? 'valid' : 'invalid'}`}>
                            {passwordStrength}% Strength
                        </span>
                    </div>
                    {!passwordIsValid && <p className="error-text">Password must meet the requirements.</p>}
                </div>
                <div className={`form-control ${!confirmedPasswordIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        ref={conPassRef}
                        placeholder="Confirm your password"
                        onChange={handleConfirmedPasswordChange}
                        onBlur={handleConfirmedPasswordBlur}
                        value={confirmedPassword}
                    />
                    {!confirmedPasswordIsValid && <p className="error-text">Passwords do not match.</p>}
                </div>
                {serverError && <p className="error-text">{serverError}</p>}
                <button
                    className={'btn'}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
