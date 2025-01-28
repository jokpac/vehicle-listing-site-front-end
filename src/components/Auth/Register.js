import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import AuthService from "../../services/AuthService";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const password = watch("password");

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
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setSuccessful(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <form onSubmit={handleSubmit(handleRegister)}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
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
                                    <div className="alert alert-danger">
                                        {errors.username.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("email", {
                                        required: "This field is required!",
                                        validate: (value) =>
                                            isEmail(value) || "This is not a valid email.",
                                    })}
                                />
                                {errors.email && (
                                    <div className="alert alert-danger">{errors.email.message}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
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
                                    <div className="alert alert-danger">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="passwordConfirmation">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register("passwordConfirmation", {
                                        required: "Please confirm your password!",
                                        validate: (value) =>
                                            value === password || "Passwords do not match",
                                    })}
                                />
                                {errors.passwordConfirmation && (
                                    <div className="alert alert-danger">
                                        {errors.passwordConfirmation.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
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
                </form>
            </div>
        </div>
    );
};

export default Register;
