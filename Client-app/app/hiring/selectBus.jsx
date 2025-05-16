import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const SelectBus = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const router = useRouter()
  // Mock data for buses
  const buses = [
    {
      id: 1,
      name: 'Express Bus',
      route: 'New York - Boston',
      departure: '08:00 AM',
      arrival: '12:00 PM',
      price: '$45',
      seats: 45,
      amenities: ['WiFi', 'AC', 'USB Charging']
    },
    {
      id: 2,
      name: 'Comfort Plus',
      route: 'New York - Philadelphia',
      departure: '09:30 AM',
      arrival: '11:30 AM',
      price: '$35',
      seats: 35,
      amenities: ['WiFi', 'AC', 'Reclining Seats']
    },
    // Add more bus data as needed
  ]

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-orange-600 pt-12 pb-4 px-4">
        <Text className="text-2xl font-bold text-white mb-4">Select Your Bus</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-lg px-4 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-700"
            placeholder="Search buses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Bus List */}
      <ScrollView className="flex-1 px-4 py-4">
        {buses.map((bus) => (
          <TouchableOpacity
            key={bus.id}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800">{bus.name}</Text>
                <Text className="text-gray-600 mt-1">{bus.route}</Text>
                
                <View className="flex-row items-center mt-3">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-600 ml-1">{bus.departure}</Text>
                  </View>
                  <Text className="mx-2 text-gray-400">→</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-600 ml-1">{bus.arrival}</Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap mt-3">
                  {bus.amenities.map((amenity, index) => (
                    <View
                      key={index}
                      className="bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2"
                    >
                      <Text className="text-orange-600 text-xs">{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="items-end">
                <Text className="text-2xl font-bold text-orange-600">{bus.price}</Text>
                <Text className="text-gray-500 text-sm mt-1">{bus.seats} seats</Text>
                <TouchableOpacity onPress={ router.push('/hiring/passengerInfo')} className="bg-orange-600 rounded-lg px-4 py-2 mt-3">
                  <Text className="text-white font-semibold">Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default SelectBus