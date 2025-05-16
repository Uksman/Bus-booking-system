import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'

const Hire = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: new Date(),
    departureTime: new Date(),
    returnDate: new Date(),
    returnTime: new Date(),
    tripType: 'oneWay',
  })

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [datePickerType, setDatePickerType] = useState('departure')


  const router = useRouter()

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        [datePickerType === 'departure' ? 'departureDate' : 'returnDate']: selectedDate
      }))
    }
    setShowDatePicker(false)
  }

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setFormData(prev => ({
        ...prev,
        [datePickerType === 'departure' ? 'departureTime' : 'returnTime']: selectedTime
      }))
    }
    setShowTimePicker(false)
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-orange-600 p-6 pt-12">
        <Text className="text-2xl font-bold text-white mb-2">Hire a Bus</Text>
        <Text className="text-gray-200">Plan your journey</Text>
      </View>

      <View className="p-4">
        {/* Trip Type Selection */}
        <View className="flex-row bg-white rounded-lg p-1 mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${formData.tripType === 'oneWay' ? 'bg-orange-600' : 'bg-transparent'}`}
            onPress={() => setFormData(prev => ({ ...prev, tripType: 'oneWay' }))}
          >
            <Text className={`text-center font-semibold ${formData.tripType === 'oneWay' ? 'text-white' : 'text-gray-600'}`}>
              One Way
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg ${formData.tripType === 'roundTrip' ? 'bg-orange-600' : 'bg-transparent'}`}
            onPress={() => setFormData(prev => ({ ...prev, tripType: 'roundTrip' }))}
          >
            <Text className={`text-center font-semibold ${formData.tripType === 'roundTrip' ? 'text-white' : 'text-gray-600'}`}>
              Round Trip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Booking Form */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          {/* From */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">From</Text>
            <View className="flex-row items-center border border-gray-200 rounded-lg p-3">
              <Ionicons name="location" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-2 text-gray-700"
                placeholder="Enter departure city"
                value={formData.from}
                onChangeText={(text) => setFormData(prev => ({ ...prev, from: text }))}
              />
            </View>
          </View>

          {/* To */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">To</Text>
            <View className="flex-row items-center border border-gray-200 rounded-lg p-3">
              <Ionicons name="location" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-2 text-gray-700"
                placeholder="Enter destination city"
                value={formData.to}
                onChangeText={(text) => setFormData(prev => ({ ...prev, to: text }))}
              />
            </View>
          </View>

          {/* Departure Date & Time */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Departure</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="flex-1 border border-gray-200 rounded-lg p-3"
                onPress={() => {
                  setDatePickerType('departure')
                  setShowDatePicker(true)
                }}
              >
                <Text className="text-gray-700">
                  {formData.departureDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 border border-gray-200 rounded-lg p-3"
                onPress={() => {
                  setDatePickerType('departure')
                  setShowTimePicker(true)
                }}
              >
                <Text className="text-gray-700">
                  {formData.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Return Date & Time (only for round trip) */}
          {formData.tripType === 'roundTrip' && (
            <View className="mb-4">
              <Text className="text-gray-600 mb-2">Return</Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  className="flex-1 border border-gray-200 rounded-lg p-3"
                  onPress={() => {
                    setDatePickerType('return')
                    setShowDatePicker(true)
                  }}
                >
                  <Text className="text-gray-700">
                    {formData.returnDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 border border-gray-200 rounded-lg p-3"
                  onPress={() => {
                    setDatePickerType('return')
                    setShowTimePicker(true)
                  }}
                >
                  <Text className="text-gray-700">
                    {formData.returnTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Search Button */}
          <TouchableOpacity
            className="bg-orange-600 rounded-lg p-4 mt-4"
            onPress={() => {
              // Handle search logic here
              console.log('Search with:', formData)
              router.push('/hiring/selectBus')
            }}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Search Buses
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date & Time Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={datePickerType === 'departure' ? formData.departureDate : formData.returnDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={datePickerType === 'departure' ? formData.departureTime : formData.returnTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </ScrollView>
  )
}

export default Hire

const styles = StyleSheet.create({})

