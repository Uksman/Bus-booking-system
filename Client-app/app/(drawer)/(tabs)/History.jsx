import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const History = () => {
  // Sample data - replace with actual data from your backend
  const historyData = [
    {
      id: 1,
      type: 'booking',
      route: 'New York to Boston',
      date: '2024-03-15',
      time: '09:00 AM',
      status: 'Completed',
      price: '$45.00',
      busNumber: 'BUS-123',
      seats: 2
    },
    {
      id: 2,
      type: 'hiring',
      route: 'Boston to Philadelphia',
      date: '2024-03-10',
      time: '02:30 PM',
      status: 'Cancelled',
      price: '$550.00',
      busNumber: 'BUS-456',
      duration: '3 days'
    },
    {
      id: 3,
      type: 'booking',
      route: 'Philadelphia to Washington DC',
      date: '2024-03-05',
      time: '11:15 AM',
      status: 'Completed',
      price: '$40.00',
      busNumber: 'BUS-789',
      seats: 1
    },
    {
      id: 4,
      type: 'hiring',
      route: 'Washington DC to New York',
      date: '2024-03-20',
      time: '08:00 AM',
      status: 'Upcoming',
      price: '$600.00',
      busNumber: 'BUS-101',
      duration: '2 days'
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    return type === 'booking' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
  }

  const getTypeIcon = (type) => {
    return type === 'booking' ? 'ticket-outline' : 'bus-outline'
  }

  const renderHistoryItem = (item) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white rounded-xl p-4 mb-4 shadow-sm"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className={`px-3 py-1 rounded-full ${getTypeColor(item.type)} mr-2`}>
              <Text className="text-sm font-medium capitalize">{item.type}</Text>
            </View>
            <Ionicons name={getTypeIcon(item.type)} size={20} color="#6B7280" />
          </View>
          <Text className="text-lg font-semibold text-gray-800 mt-2">{item.route}</Text>
          <Text className="text-gray-500 mt-1">Bus: {item.busNumber}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
          <Text className="text-sm font-medium">{item.status}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-4">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text className="text-gray-600 ml-2">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text className="text-gray-600 ml-2">{item.time}</Text>
        </View>
      </View>

      <View className="mt-4 pt-4 border-t border-gray-100 flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-800">{item.price}</Text>
        {item.type === 'booking' ? (
          <Text className="text-gray-600">Seats: {item.seats}</Text>
        ) : (
          <Text className="text-gray-600">Duration: {item.duration}</Text>
        )}
      </View>
    </TouchableOpacity>
  )

  const bookings = historyData.filter(item => item.type === 'booking')
  const hirings = historyData.filter(item => item.type === 'hiring')

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">History</Text>
        <Text className="text-gray-500 mt-1">View your bookings and bus hiring history</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {bookings.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Bus Bookings</Text>
            {bookings.map(renderHistoryItem)}
          </View>
        )}

        {hirings.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Bus Hiring</Text>
            {hirings.map(renderHistoryItem)}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default History