import React, { useState, useEffect } from 'react';
import '../login/login.css'; // Import the CSS file for this component
import passwordValidator from 'password-validator';
import './passwordStrengthMeter.css'; // Import CSS for PasswordStrengthMeter

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

const SignUp = (props) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [nameIsValid, setNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [confirmedPasswordIsValid, setConfirmedPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    // Use useEffect to set form validity based on name, email, password, and confirmed password
    useEffect(() => {
        const isNameValid = /^[A-Z]+[a-z0-9]{6,}$/.test(enteredName);
        const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail);
        const isPasswordValid = schema.validate(enteredPassword);  // Validate password using schema
        const isConfirmedPasswordValid = enteredPassword === confirmedPassword;
        setFormIsValid(
            isNameValid && 
            isEmailValid && 
            isPasswordValid && 
            isConfirmedPasswordValid
        );
    }, [
        enteredName,
        enteredEmail,
        enteredPassword,
        confirmedPassword
    ]);

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleNameBlur = () => {
        setNameIsValid(/^[A-Z]+[a-z0-9]{6,}$/.test(enteredName));
    };

    const handleEmailBlur = () => {
        setEmailIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail));
    };

    const handlePasswordBlur = () => {
        setPasswordIsValid(schema.validate(enteredPassword));  // Validate password onBlur
    };

    const handleConfirmedPasswordBlur = () => {
        setConfirmedPasswordIsValid(enteredPassword === confirmedPassword);
    };

    const handlePasswordChange = (event) => {
        setEnteredPassword(event.target.value);
        // Check if the confirmed password matches immediately after changing the password
        setConfirmedPasswordIsValid(event.target.value === confirmedPassword);
    };

    const handleConfirmedPasswordChange = (event) => {
        setConfirmedPassword(event.target.value);
        // Update the validity of confirmed password immediately after changing it
        setConfirmedPasswordIsValid(enteredPassword === event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            props.onLogin(enteredEmail, enteredPassword, enteredName);
        } else {
            // Additional validation to handle the case where the user submits without focusing out
            setNameIsValid(/^[A-Z]+[a-z0-9]{6,}$/.test(enteredName));
            setEmailIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail));
            setPasswordIsValid(schema.validate(enteredPassword));
            setConfirmedPasswordIsValid(enteredPassword === confirmedPassword);
        }
    };

    // Function to calculate the password strength score and return a percentage
    const calculatePasswordStrength = (password) => {
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[\W_]/)) strength += 25; // Add for symbols
        if (strength > 100) strength = 100; // Max out at 100%

        return strength;
    };

    // Function to get color based on the password strength score
    const getPasswordStrengthColor = (strength) => {
        if (strength >= 75) return 'green';
        if (strength >= 50) return 'orange';
        if (strength >= 25) return 'yellow';
        return 'red';
    };

    // Calculate the current password strength
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
                        pattern="^[A-Z]+[a-z0-9]{6,}$"
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
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        title="Enter a valid email address (e.g., someone@example.com)"
                        placeholder="Enter your email"
                        onChange={handleChange(setEnteredEmail)}
                        onBlur={handleEmailBlur}
                        value={enteredEmail}
                    />
                </div>
                <div className={`form-control ${!passwordIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
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
                </div>
                <div className={`form-control ${!confirmedPasswordIsValid ? 'invalid' : ''}`}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        onChange={handleConfirmedPasswordChange}
                        onBlur={handleConfirmedPasswordBlur}
                        value={confirmedPassword}
                    />
                </div>
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
