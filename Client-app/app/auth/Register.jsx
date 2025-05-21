import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import authService from "../../services/authService";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    // Validate full name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate phone number
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.register(formData);

      // Registration successful
      setIsLoading(false);

      // Navigate to tabs
      router.replace("/(tabs)");
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  return (
    <View className='flex-1 justify-center bg-white p-5'>
      <Text className='text-2xl font-bold text-center text-gray-800 mt-10'>
        Create Account
      </Text>
      <Text className='text-center text-gray-500 mb-6'>
        Register to book or hire a bus
      </Text>

      <TextInput
        className={`border ${
          errors.name ? "border-red-500" : "border-gray-300"
        } rounded-lg p-3 mb-1 text-gray-800`}
        placeholder='Full Name'
        placeholderTextColor='#999'
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      {errors.name && (
        <Text className='text-red-500 mb-2 text-xs'>{errors.name}</Text>
      )}

      <TextInput
        className={`border ${
          errors.email ? "border-red-500" : "border-gray-300"
        } rounded-lg p-3 mb-1 text-gray-800`}
        placeholder='Email Address'
        keyboardType='email-address'
        placeholderTextColor='#999'
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors.email && (
        <Text className='text-red-500 mb-2 text-xs'>{errors.email}</Text>
      )}

      <TextInput
        className={`border ${
          errors.phone ? "border-red-500" : "border-gray-300"
        } rounded-lg p-3 mb-1 text-gray-800`}
        placeholder='Phone Number'
        keyboardType='phone-pad'
        placeholderTextColor='#999'
        value={formData.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />
      {errors.phone && (
        <Text className='text-red-500 mb-2 text-xs'>{errors.phone}</Text>
      )}

      <TextInput
        className={`border ${
          errors.password ? "border-red-500" : "border-gray-300"
        } rounded-lg p-3 mb-1 text-gray-800`}
        placeholder='Password'
        secureTextEntry
        placeholderTextColor='#999'
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      {errors.password && (
        <Text className='text-red-500 mb-2 text-xs'>{errors.password}</Text>
      )}

      <TouchableOpacity
        className='bg-orange-600 p-4 rounded-lg mt-2'
        onPress={handleRegister}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color='#ffffff' />
        ) : (
          <Text className='text-white font-semibold text-center'>Register</Text>
        )}
      </TouchableOpacity>

      <Text className='text-center text-gray-500 mt-4'>
        Already have an account?{" "}
        <Pressable onPress={() => router.push("/auth/Login")}>
          <Text className='text-orange-600'>Sign In</Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default Register;
