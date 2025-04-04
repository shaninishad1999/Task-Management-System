import axios from "axios";

const baseURL = "http://localhost:5000/user"; // Fixed API base URL

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(
            `${baseURL}/login`,
            { email, password },
            // { withCredentials: true } // Includes cookies for authentication
            localStorage.getItem("email")
        );  

        return response.data; // Return the response data
    } catch (error) {
        console.error("Error logging in:", error);

        // Extracts error message from backend response
        throw new Error(error.response?.data?.msg || "Authentication failed");
    }
};
