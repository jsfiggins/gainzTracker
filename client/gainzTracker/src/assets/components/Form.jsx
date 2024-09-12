import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { RiEyeCloseLine } from 'react-icons/ri';

function Form(props) {
    const initState = { username: '', password: '' };
    const [formData, setFormData] = useState(initState);
    const [showPassword, setShowPassword] = useState(false);
    const { isMember, submit, errMsg } = props;

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        submit(formData);
    }

    function togglePasswordVisibility() {
        setShowPassword(prevState => !prevState);
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Welcome to Gainz Tracker!</h2>
            <input
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
            />
            <div className="password-field">
                <input
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                />
                <span
                    onClick={togglePasswordVisibility}
                    className="password-toggle-icon"
                >
                    {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                    ) : (
                        <RiEyeCloseLine />
                    )}
                </span>
            </div>
            <button className="submit-button">{isMember ? "Login" : "Signup"}</button>
            {errMsg && <p className="error-message">{errMsg}</p>}
        </form>
    );
}

export default Form;
