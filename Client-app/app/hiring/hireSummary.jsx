import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const HireSummary = () => {
  const router = useRouter()

  // Mock data - in a real app, this would come from your state management or API
  const hireDetails = {
    busName: "AKTC Deluxe",
    busType: "Luxury Coach",
    from: "Calabar Terminal",
    to: "Kaduna Central Park",
    date: "March 15, 2024",
    duration: "3 days",
    passengers: 45,
    price: 2500,
    amenities: ["AC", "WiFi", "Entertainment", "Refreshments"],
    contactPerson: "John Doe",
    contactPhone: "+234 123 456 7890"
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-orange-500 pt-16 pb-6 px-5 rounded-b-3xl">
        <Text className="text-2xl font-bold text-white mb-2">Hire Summary</Text>
        <Text className="text-white/80">Review your bus hire details</Text>
      </View>

      <View className="p-4">
        {/* Bus Details Card */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("../../assets/images/bus.png")}
                className="w-16 h-16"
                resizeMode="contain"
              />
              <View>
                <Text className="text-lg font-semibold text-gray-800">{hireDetails.busName}</Text>
                <Text className="text-gray-500">{hireDetails.busType}</Text>
              </View>
            </View>
            <View className="bg-orange-100 px-3 py-1 rounded-full">
              <Text className="text-orange-600 font-semibold">${hireDetails.price}</Text>
            </View>
          </View>

          {/* Route Details */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">{hireDetails.from}</Text>
              <Text className="text-gray-500">Departure</Text>
            </View>
            <View className="items-center">
              <Ionicons name="arrow-forward" size={24} color="#6B7280" />
              <Text className="text-gray-500 text-sm">{hireDetails.duration}</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-lg font-semibold text-gray-800">{hireDetails.to}</Text>
              <Text className="text-gray-500">Arrival</Text>
            </View>
          </View>

          {/* Date and Passengers */}
          <View className="flex-row justify-between items-center border-t border-gray-100 pt-4">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600">{hireDetails.date}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Ionicons name="people-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600">{hireDetails.passengers} passengers</Text>
            </View>
          </View>
        </View>

        {/* Amenities Card */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Amenities</Text>
          <View className="flex-row flex-wrap gap-2">
            {hireDetails.amenities.map((amenity, index) => (
              <View key={index} className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-600">{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information Card */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Contact Information</Text>
          <View className="space-y-2">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600">{hireDetails.contactPerson}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Ionicons name="call-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600">{hireDetails.contactPhone}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3 mt-4">
          <TouchableOpacity 
            className="bg-orange-500 p-4 rounded-xl"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-white text-center font-semibold text-lg">Confirm Hire</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gray-100 p-4 rounded-xl"
            onPress={() => router.back()}
          >
            <Text className="text-gray-600 text-center font-semibold text-lg">Edit Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default HireSummary