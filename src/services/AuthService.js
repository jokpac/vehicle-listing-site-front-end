import axiosInstance from "../data/AxiosInstance"; // Import Axios instance for API calls

// Function to register a new user by sending a POST request to the signup API endpoint
const register = (username, email, password) => {
    return axiosInstance.post("api/auth/signup", {
        username,
        email,
        password,
    });
};

// Function to log in a user by sending credentials to the signin API endpoint
const login = (username, password) => {
    return axiosInstance
        .post("api/auth/signin", {
            username,
            password,
        })
        .then((response) => {
            // If response contains an accessToken, store user data in session storage
            if (response && response.data && response.data.accessToken) {
                console.log("We got Response: ", response);
                sessionStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            } else {
                throw new Error("Login failed: accessToken not found in response.");
            }
        })
        .catch((error) => {
            console.error("Login error: ", error);
            throw error;
        });
};

// Function to log out a user by removing user data from session storage
const logout = () => {
    sessionStorage.removeItem("user");
};

// Function to get the currently logged-in user from session storage
const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

// Exporting authentication functions as an object
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;