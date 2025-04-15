import axios from "axios";

// Base URL for Task Management API
const TASK_API_URL = "http://localhost:5000/tasks";

// Axios instance
const API = axios.create({
  baseURL: TASK_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request (if available)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors centrally
const handleApiError = (error) => {
  return error.response?.data?.message || "An error occurred!";
};

// 🔹 **CREATE TASK**
export const createTask = async (taskData) => {
  try {
    const response = await API.post("/create", taskData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 🔹 **GET ALL TASKS**
export const getAllTasks = async () => {
  try {
    const response = await API.get("/getalltasks");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


// 🔹 **UPDATE TASK**
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await API.put(`/updatetask/${taskId}`, updatedData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 🔹 **DELETE TASK**
export const deleteTask = async (taskId) => {
  try {
    console.log("🌐 Sending DELETE request for Task ID:", taskId);
    const response = await API.delete(`/deletetask/${taskId}`);
    console.log("✅ Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error deleting task:", error);
    throw handleApiError(error);
  }
};

