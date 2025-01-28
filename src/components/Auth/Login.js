import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthService from "../../services/AuthService";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = (data) => {
        setMessage("");
        setLoading(true);

        AuthService.login(data.username, data.password)
            .then((responseData) => {
                console.log("Login successful: ", responseData);
                navigate("/dashboard");
                window.location.reload();
            })
            .catch((error) => {
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
        <div className="col-md-12">
            <div className="card card-container">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            {...register('username', { required: "Username is required" })}
                        />
                        {errors.username && <div className="alert alert-danger">{errors.username.message}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            {...register('password', { required: "Password is required" })}
                        />
                        {errors.password && <div className="alert alert-danger">{errors.password.message}</div>}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <button type="button" className="btn btn-link" onClick={handleRegisterRedirect}>
                            Don't have an account? Register here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;