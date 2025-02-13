import React, { useState } from "react";
import "../styles/Register.css"
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"; // Authentication service for user registration

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();  // Form handling with validation

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const password = watch("password");

    // Function to handle registration submission
    const handleRegister = async (data) => {
        setMessage("");
        setSuccessful(false);

        try {
            const response = await AuthService.register(
                data.username,
                data.email,
                data.password
            );
            setMessage(response.data.message);
            setSuccessful(true);
        } catch (error) {
            // Extract error message from response or use generic message
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setSuccessful(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <form onSubmit={handleSubmit(handleRegister)}>
                    {!successful && (
                        <div>
                            {/* Username input field */}
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    {...register("username", {
                                        required: "This field is required!",
                                        minLength: {
                                            value: 3,
                                            message: "The username must be at least 3 characters long.",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "The username must be no more than 20 characters long.",
                                        },
                                    })}
                                />
                                {errors.username && (
                                    <div className="error-message">
                                        {errors.username.message}
                                    </div>
                                )}
                            </div>

                            {/* Email input field */}
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    {...register("email", {
                                        required: "This field is required!",
                                        validate: (value) =>
                                            isEmail(value) || "This is not a valid email.",
                                    })}
                                />
                                {errors.email && (
                                    <div className="error-message">{errors.email.message}</div>
                                )}
                            </div>

                            {/* Password input field */}
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    {...register("password", {
                                        required: "This field is required!",
                                        minLength: {
                                            value: 6,
                                            message: "The password must be at least 6 characters long.",
                                        },
                                        maxLength: {
                                            value: 40,
                                            message: "The password must be no more than 40 characters long.",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <div className="error-message">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password input field */}
                            <div className="input-group">
                                <label htmlFor="passwordConfirmation">Confirm Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    {...register("passwordConfirmation", {
                                        required: "Please confirm your password!",
                                        validate: (value) =>
                                            value === password || "Passwords do not match",
                                    })}
                                />
                                {errors.passwordConfirmation && (
                                    <div className="error-message">
                                        {errors.passwordConfirmation.message}
                                    </div>
                                )}
                            </div>

                            {/* Submit button */}
                            <div className="input-group">
                                <button className="submit-btn">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {/* Display error or success message */}
                    {message && (
                        <div className="input-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    {/* Redirect to login page */}
                    <div className="input-group">
                        <button
                            type="button"
                            className="login-redirect-btn"
                            onClick={handleLoginRedirect}
                        >
                            Already have an account? Login here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
