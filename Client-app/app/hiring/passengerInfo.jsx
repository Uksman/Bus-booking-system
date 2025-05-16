import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const PassengerInfo = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    idNumber: '',
  })

  const router = useRouter()

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData)
    router.push('/hiring/hireSummary')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Passenger Information</Text>
          <Text className="text-gray-600 mb-6">Please fill in your details below</Text>

          <View className="space-y-4">
            {/* Full Name Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
            </View>

            {/* Phone Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Phone Number</Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
              />
            </View>

            {/* Address Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">Address</Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Enter your address"
                multiline
                numberOfLines={3}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
              />
            </View>

            {/* ID Number Input */}
            <View>
              <Text className="text-gray-700 font-medium mb-2">ID Number</Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChangeText={(text) => setFormData({ ...formData, idNumber: text })}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-orange-600 py-4 rounded-lg mt-6"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PassengerInfo