import '../styles/Dashboard.css'
import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import ListingService from "../services/ListingService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (listingId) => {
        navigate(`/edit-listing/${listingId}`);
    };

    const handleViewDetails = (listingId) => {
        navigate(`/listing/${listingId}`);
    };

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
            fetchUserListings(currentUser.id);
        }
    }, []);

    const fetchUserListings = async (userId) => {
        try {
            const userListings = await ListingService.getUserListings(userId);
            setListings(userListings || []);
        } catch (error) {
            console.error("Error fetching user listings:", error);
        }
    };

    const handleDelete = async (listingId) => {
        try {
            await ListingService.deleteListing(listingId);
            setListings((prevListings) =>
                prevListings.filter((listing) => listing.id !== listingId)
            );
            alert("Listing deleted successfully!");
        } catch (error) {
            console.error("Error deleting listing:", error);
            alert("Failed to delete the listing.");
        }
    };

    const handleToggleStatus = async (listingId, currentStatus) => {
        const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        try {
            await ListingService.updateListingStatus(listingId, newStatus);

            setListings((prevListings) =>
                prevListings.map((listing) =>
                    listing.id === listingId ? { ...listing, listingStatus: newStatus } : listing
                )
            );
        } catch (error) {
            console.error("Error updating listing status:", error);
            alert("Failed to update the listing status.");
        }
    };

    return (
        <div className="dashboard">
            {user ? (
                <div>
                    <h1>Welcome, {user.username}</h1>
                    <h2>Your Listings</h2>
                    {listings.length > 0 ? (
                        <ul className="listing-list">
                            {listings.map((listing) => (
                                <li key={listing.id} className="listing-item">
                                    <h3
                                        className="title"
                                        style={{ cursor: "pointer", color: "black" }}
                                        onClick={() => handleViewDetails(listing.id)}
                                    >
                                        {listing.title}
                                    </h3>
                                    <label>
                                        Active
                                        <input
                                            type="checkbox"
                                            checked={listing.listingStatus === "ACTIVE"}
                                            onChange={() => handleToggleStatus(listing.id, listing.listingStatus)}
                                        />
                                    </label>
                                    <button onClick={() => handleEdit(listing.id)}>Edit</button>
                                    <button onClick={() => handleDelete(listing.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no listings yet.</p>
                    )}
                </div>
            ) : (
                <p>Please log in to access your dashboard.</p>
            )}
        </div>
    );
};

export default Dashboard;