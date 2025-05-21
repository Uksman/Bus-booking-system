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

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.login(
        formData.email,
        formData.password
      );

      // Login successful
      setIsLoading(false);

      // Navigate to tabs
      router.replace("/(tabs)");
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Login Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <View className='flex-1 bg-white justify-center px-6'>
      <Text className='text-3xl font-bold text-center text-orange-600 mb-6'>
        Welcome Back
      </Text>

      {errors.submit && (
        <Text className='text-red-500 text-center mb-4'>{errors.submit}</Text>
      )}

      <View className='mb-4'>
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-xl px-4 py-3 text-base`}
          value={formData.email}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, email: text }));
            if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
          }}
          autoCapitalize='none'
        />
        {errors.email && (
          <Text className='text-red-500 text-sm mt-1'>{errors.email}</Text>
        )}
      </View>

      <View className='mb-6'>
        <TextInput
          placeholder='Password'
          secureTextEntry
          className={`border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-xl px-4 py-3 text-base`}
          value={formData.password}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, password: text }));
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: null }));
          }}
        />
        {errors.password && (
          <Text className='text-red-500 text-sm mt-1'>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        className='bg-orange-600 rounded-xl py-4'
        onPress={handleLogin}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text className='text-white text-center font-semibold text-lg'>
            Login
          </Text>
        )}
      </TouchableOpacity>

      <Pressable
        className='mt-4'
        onPress={() => router.push("/auth/ForgotPassword")}>
        <Text className='text-center text-orange-600'>Forgot Password?</Text>
      </Pressable>

      <Text className='text-center text-gray-500 mt-4'>
        {" "}
        Dont have an account?
        <Pressable onPress={() => router.push("/auth/Register")}>
          <Text className='text-orange-600'>Register</Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default Login;
