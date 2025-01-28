import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    };

    const handleAddListingClick = () => {
        if (!currentUser) {
            Swal.fire({
                icon: "warning",
                title: "Access Denied",
                text: "Please log in or register to add a listing.",
                confirmButtonText: "OK",
            });
        } else {
            navigate("/add-listing");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Car Listings</Link>
            </div>
            <div className="navbar-links">
                <button
                    className="btn btn-outline-primary"
                    onClick={handleAddListingClick}
                >
                    Add Listing
                </button>
                {currentUser && (
                    <Link to="/dashboard" className="btn btn-outline-info">
                        Dashboard
                    </Link>
                )}
                {currentUser ? (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
