import React, { useState } from "react";
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService"; // Authentication service for login requests

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm(); // Form handling with validation

    const [loading, setLoading] = useState(false); // State for loading indicator
    const [message, setMessage] = useState(""); // State for error messages

    // Function to handle form submission
    const onSubmit = (data) => {
        setMessage("");
        setLoading(true);

        // Attempt login with the provided username and password
        AuthService.login(data.username, data.password)
            .then((responseData) => {
                console.log("Login successful: ", responseData);
                navigate("/dashboard");
            })
            .catch((error) => {
                // Extract error message from response or use generic message
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
                console.error("Login error:", error);
            });
    };

    const handleRegisterRedirect = () => {
        navigate("/register");
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username input field */}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            name="username"
                            {...register('username', { required: "Username is required" })}
                        />
                        {errors.username && <div className="alert alert-danger">{errors.username.message}</div>}
                    </div>

                    {/* Password input field */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            name="password"
                            {...register('password', { required: "Password is required" })}
                        />
                        {errors.password && <div className="alert alert-danger">{errors.password.message}</div>}
                    </div>

                    {/* Submit button with loading state */}
                    <div className="input-group">
                        <button className="submit-btn" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            <span>Login</span>
                        </button>
                    </div>

                    {/* Error message display */}
                    {message && (
                        <div className="input-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}

                    {/* Redirect to registration page */}
                    <div className="input-group">
                        <button type="button" className="register-redirect-btn" onClick={handleRegisterRedirect}>
                            Don't have an account? Register here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;