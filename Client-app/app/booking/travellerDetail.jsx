import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const travellerDetail = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: ''
  })
const router = useRouter()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form Data:', formData)
    router.push('/booking/tripSummary')
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="bg-orange-600 px-4 pt-6 pb-8 rounded-b-3xl shadow-lg">
          <Text className="text-3xl font-bold text-white mb-2">Traveller Details</Text>
          <Text className="text-indigo-100">Please fill in your information below</Text>
        </View>

        <View className="px-4 -mt-6">
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="space-y-5">
              {/* First Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">First Name</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4">
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 py-3 ml-2 text-gray-700"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    placeholder="Enter first name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Last Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Last Name</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4">
                  <Ionicons name="person-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 py-3 ml-2 text-gray-700"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    placeholder="Enter last name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Email */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Email</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4">
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 py-3 ml-2 text-gray-700"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Phone */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Phone Number</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4">
                  <Ionicons name="call-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 py-3 ml-2 text-gray-700"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Age */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Age</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4">
                  <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 py-3 ml-2 text-gray-700"
                    value={formData.age}
                    onChangeText={(value) => handleInputChange('age', value)}
                    placeholder="Enter age"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Gender */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Gender</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4">
                  <Ionicons name="male-female-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 py-3 ml-2 text-gray-700"
                    value={formData.gender}
                    onChangeText={(value) => handleInputChange('gender', value)}
                    placeholder="Enter gender"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Address */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Address</Text>
                <View className="flex-row items-start border border-gray-200 rounded-xl bg-gray-50 px-4 pt-3">
                  <Ionicons name="location-outline" size={20} color="#6B7280" className="mt-2" />
                  <TextInput
                    className="flex-1 py-2 ml-2 text-gray-700"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                    placeholder="Enter address"
                    multiline
                    numberOfLines={3}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-orange-600 py-4 rounded-xl mt-6 shadow-lg"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default travellerDetail