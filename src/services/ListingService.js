import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user?.accessToken;
    if (!token) {
        throw new Error("No access token found. Please log in.");
    }
    return { Authorization: `Bearer ${token}` };
};

const getUserListings = async (userId) => {
    const response = await axios.get(`${API_URL}/listings/user/${userId}`);
    return response.data;
};

const deleteListing = async (listingId) => {
    try {
        const response = await axios.delete(`${API_URL}/listings/${listingId}`, {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting listing:", error.response?.data || error.message);
        throw error;
    }
};

const updateListingStatus = async (listingId, status) => {
    try {
        const response = await axios.put(
            `${API_URL}/listings/${listingId}/status`,
            status,
            {
                headers: {
                    ...getAuthHeader(),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating listing status:", error);
        throw error;
    }
};

const submitListing = async (listingData) => {
    try {
        const response = await axios.post(`${API_URL}/listings`, listingData, {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json",
            },
        });
        console.log("Listing submitted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting listing:", error.response?.data || error.message);
        throw error;
    }
};

const ListingService = {
    getUserListings,
    deleteListing,
    updateListingStatus,
    submitListing,
};

export default ListingService;
