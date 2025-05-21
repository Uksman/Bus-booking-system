import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
api.interceptors.request.use(
  async (config) => {
    // Get token from AsyncStorage
    const token = await AsyncStorage.getItem("token");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    // Handle response errors
    const { response } = error;

    if (response) {
      // Server responded with an error status code
      if (response.status === 401) {
        // Unauthorized - token expired or invalid
        // You might want to redirect to login or clear auth state here
        AsyncStorage.removeItem("token");
        // Authentication context handling will be added later
      }

      // Return the error response for handling in components
      return Promise.reject(response);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Network Error:", error.request);
      return Promise.reject({
        status: 0,
        data: { message: "Network error. Please check your connection." },
      });
    } else {
      // Something happened in setting up the request
      console.error("Request Error:", error.message);
      return Promise.reject({
        status: 0,
        data: { message: "Request configuration error." },
      });
    }
  }
);

export default api;
