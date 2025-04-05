// /create-user

import axios from "axios";

const CREATED_ADMIN_API = "http://localhost:5000/admin"; // Fixed API base URL

const createUser = async (userData) => {
    try {
        const response = await axios.post(`${CREATED_ADMIN_API}/create-user`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
        });
        
        return response.data;
        
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error(error.response?.data?.msg || "User creation failed");
    }
    }





const userDisplay = async () => {
    try {
        const response = await axios.get(`${CREATED_ADMIN_API}/user-display`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error(error.response?.data?.msg || "User retrieval failed");
    }
}

export { createUser, userDisplay };