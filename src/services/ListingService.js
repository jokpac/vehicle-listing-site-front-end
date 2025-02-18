import axiosInstance from "../data/AxiosInstance";

const getListings = async (filters) => {
    try {
        const response = await axiosInstance.get("/api/listings/filter", {
            params: filters,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching listings:", error.response?.data || error.message);
        throw error;
    }
};

const getUserListings = async (userId) => {
    try {
        const response = await axiosInstance.get(`api/listings/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user listings:", error.response?.data || error.message);
        throw error;
    }
};

const getListingById = async (listingId) => {
    try {
        const response = await axiosInstance.get(`api/listings/${listingId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching listing by ID:", error.response?.data || error.message);
        throw error;
    }
};

const deleteListing = async (listingId) => {
    try {
        const response = await axiosInstance.delete(`api/listings/${listingId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting listing:", error.response?.data || error.message);
        throw error;
    }
};

const updateListing = async (listingId, listingData) => {
    try {
        const response = await axiosInstance.put(`api/listings/${listingId}`, listingData);
        console.log("Listing updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating listing:", error.response?.data || error.message);
        throw error;
    }
};

const updateListingStatus = async (listingId, status) => {
    try {
        const response = await axiosInstance.put(`api/listings/${listingId}/status`, status);
        return response.data;
    } catch (error) {
        console.error("Error updating listing status:", error.response?.data || error.message);
        throw error;
    }
};

const submitListing = async (listingData) => {
    try {
        const response = await axiosInstance.post('api/listings', listingData);
        console.log("Listing submitted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting listing:", error.response?.data || error.message);
        throw error;
    }
};

const ListingService = {
    getUserListings,
    getListingById,
    deleteListing,
    updateListingStatus,
    updateListing,
    submitListing,
    getListings
};

export default ListingService;