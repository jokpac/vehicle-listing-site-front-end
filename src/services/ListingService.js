import axios from "axios";

const API_URL = "http://localhost:8080/api/listings";

const submitListing = async (listingData) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user?.accessToken;

    if (!token) {
        console.error("No access token found. Please log in.");
        return;
    }

    try {
        const response = await axios.post(API_URL, listingData, {
            headers: {
                Authorization: `Bearer ${token}`,
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
    submitListing,
};

export default ListingService;
