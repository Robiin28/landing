import React, { useState } from 'react';
import axios from 'axios';
import './validate.css';

const Validate = ({ email }) => {
    const [validationNumber, setValidationNumber] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);

    const handleValidate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/validate', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Validation email sent:', response.data);
            alert('Validation email sent! Check your email for the validation number.');
            setShowVerificationInput(true); // Show the input field after sending the email
        } catch (error) {
            console.error('Email send failed:', error.message);
            alert('Email send failed: ' + error.message);
        }
    };

    const handleVerify = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/validateNow', { email, validationNumber }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Verification successful:', response.data);
            alert('Email verification successful!');
            // Optionally, you can handle any additional logic here after successful verification
        } catch (error) {
            console.error('Verification failed:', error.message);
            alert('Email verification failed: ' + error.message);
        }
    };

    return (
        <div className="validate-container">
            <h1>Email Validation</h1>
            <p>One step only</p>
            <button onClick={handleValidate}>Send Validation Email</button>

            {showVerificationInput && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter validation number"
                        value={validationNumber}
                        onChange={(e) => setValidationNumber(e.target.value)}
                    />
                    <button onClick={handleVerify}>Verify</button>
                </div>
            )}
        </div>
    );
};

export default Validate;
