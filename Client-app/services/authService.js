import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.1.68:5000/api"; // Using 10.0.2.2 for Android emulator to access localhost
const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "An error occurred during registration",
        }
      );
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "An error occurred during login" }
      );
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  getCurrentUser: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return null;

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return null;
    }
  },
};

export default authService;
