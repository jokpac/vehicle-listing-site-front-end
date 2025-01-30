import axiosInstance from "../data/AxiosInstance";

const register = (username, email, password) => {
    return axiosInstance.post("api/auth/signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axiosInstance
        .post("api/auth/signin", {
            username,
            password,
        })
        .then((response) => {
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

const logout = () => {
    sessionStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;