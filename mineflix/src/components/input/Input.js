// Input.js
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const Input = forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
       focus:customFocus
    }));
    function customFocus(){
      inputRef.current.focus();
    }

    return (
        <div className={`form-control ${!props.isValid ? 'invalid' : ''}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <div className={`${props.name}-input`}>
                <input
                    id={props.name}
                    ref={inputRef}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChangeHandler}
                    onBlur={props.onBlurHandler} // Call the blur handler when input loses focus
                    disabled={props.disabled}
                    required
                />
                {props.showChangeLink && (
                    <span className="change-email-text" onClick={props.onReset}>
                        Change Email
                    </span>
                )}
            </div>
        </div>
    );
});

export default Input;
