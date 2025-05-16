import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Register = () => {
const router = useRouter()

  return (
    <View className='flex-1 justify-center bg-white p-5'>
      <Text className='text-2xl font-bold text-center text-gray-800 mt-10'>
        Create Account
      </Text>
      <Text className='text-center text-gray-500 mb-6'>
        Register to book or hire a bus
      </Text>

      <TextInput
        className='border border-gray-300 rounded-lg p-3 mb-4 text-gray-800'
        placeholder='Full Name'
        placeholderTextColor='#999'
      />
      <TextInput
        className='border border-gray-300 rounded-lg p-3 mb-4 text-gray-800'
        placeholder='Email Address'
        keyboardType='email-address'
        placeholderTextColor='#999'
      />
      <TextInput
        className='border border-gray-300 rounded-lg p-3 mb-4 text-gray-800'
        placeholder='Phone Number'
        keyboardType='phone-pad'
        placeholderTextColor='#999'
      />
      <TextInput
        className='border border-gray-300 rounded-lg p-3 mb-4 text-gray-800'
        placeholder='Password'
        secureTextEntry
        placeholderTextColor='#999'
      />

      <TouchableOpacity
        className='bg-orange-600 p-4 rounded-lg mt-2'
        onPress={() => router.push('/(tabs)')}>
        <Text className='text-white font-semibold text-center'>Register</Text>
      </TouchableOpacity>

      <Text className='text-center text-gray-500 mt-4'>
        Already have an account?{" "}
        <Pressable onPress={()=> router.push('/auth/Login')} >
          <Text className='text-orange-600'>Sign In</Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default Register;
