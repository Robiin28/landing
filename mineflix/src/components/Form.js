import React, { useState, useEffect } from 'react';
import passwordValidator from 'password-validator';
import './form.css';

const Form = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    // State to manage which panel is active
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(enteredPassword);
    useEffect(() => {
        setFormIsValid(isEmailValid && isPasswordValid);
    }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    // Event handlers for the buttons
    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };
    const emailBlurHandler = () => {
        setEmailIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enteredEmail));
    };

    const passwordBlurHandler = () => {
        setPasswordIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(enteredPassword));
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };
    const submitHandler = (event) => {
        event.preventDefault();    
       
    };

    return (
        <>
            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <div className="form__group field">
                                <input type="input" class="form__field" placeholder="Name" required=""></input>
                                <label for="name" class="form__label">Name</label>
                         </div>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#" onSubmit={submitHandler}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <div>
                    <input
                        id="email"
                        type="email"
                        title="Enter a valid email address"
                        placeholder="Enter your email"
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                </div>
                <div>
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
                        <a href="#">Forgot your password?</a>
                <button
                        className={'btn'}
                        type="submit"
                        disabled={!formIsValid}>
                      Login
                </button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick} id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={handleSignUpClick} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
