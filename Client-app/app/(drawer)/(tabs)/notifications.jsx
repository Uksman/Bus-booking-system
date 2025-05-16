import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const notifications = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: 'Booking Confirmed',
      message: 'Your bus booking for Route 101 has been confirmed',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Payment Successful',
      message: 'Payment of $50 has been processed successfully',
      time: '5 hours ago',
      type: 'info',
      read: true
    },
    {
      id: 3,
      title: 'Booking Reminder',
      message: 'Your bus journey is scheduled for tomorrow at 9:00 AM',
      time: '1 day ago',
      type: 'warning',
      read: true
    }
  ]

  const getIconName = (type) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle'
      case 'info':
        return 'information-circle'
      case 'warning':
        return 'alert-circle'
      default:
        return 'notifications'
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-emerald-500'
      case 'info':
        return 'text-orange-500'
      case 'warning':
        return 'text-amber-500'
      default:
        return 'text-gray-500'
    }
  }

  const getGradientColors = (type) => {
    switch (type) {
      case 'success':
        return ['#10B981', '#059669']
      case 'info':
        return ['#F97316', '#EA580C']
      case 'warning':
        return ['#F59E0B', '#D97706']
      default:
        return ['#6B7280', '#4B5563']
    }
  }

  return (
    <View className="flex-1 bg-orange-50">
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#F97316', '#EA580C']}
        className="px-6 pt-12 pb-6 rounded-b-3xl shadow-lg"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-white">Notifications</Text>
            <Text className="text-white/90 mt-1 text-base">Stay updated with your bookings</Text>
          </View>
          <TouchableOpacity className="bg-white/20 p-3 rounded-full">
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Notifications List */}
      <ScrollView 
        className="flex-1 px-4 -mt-4"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {notifications.map((notification, index) => (
            <TouchableOpacity
              key={notification.id}
              className={`mb-4 rounded-2xl overflow-hidden shadow-sm ${
                !notification.read ? 'bg-white' : 'bg-white/80'
              }`}
              style={{
                transform: [{ scale: 1 }],
                elevation: 2,
              }}
            >
              <LinearGradient
                colors={getGradientColors(notification.type)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="h-1"
              />
              <View className="p-4">
                <View className="flex-row items-start space-x-4">
                  <View className={`mt-1 ${getIconColor(notification.type)}`}>
                    <Ionicons name={getIconName(notification.type)} size={28} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-lg font-bold text-gray-800">
                        {notification.title}
                      </Text>
                      <Text className="text-sm text-gray-500 font-medium">
                        {notification.time}
                      </Text>
                    </View>
                    <Text className="text-gray-600 mt-2 leading-5">
                      {notification.message}
                    </Text>
                    {!notification.read && (
                      <View className="mt-3 flex-row justify-end">
                        <TouchableOpacity className="bg-orange-50 px-4 py-2 rounded-full">
                          <Text className="text-orange-600 font-medium">Mark as read</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Empty State */}
      {notifications.length === 0 && (
        <View className="flex-1 items-center justify-center p-4">
          <View className="bg-orange-50 p-8 rounded-full mb-4">
            <Ionicons name="notifications-off" size={64} className="text-orange-400" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mt-4">
            No Notifications
          </Text>
          <Text className="text-gray-500 text-center mt-2 text-base">
            You don't have any notifications at the moment
          </Text>
          <TouchableOpacity className="mt-6 bg-orange-500 px-6 py-3 rounded-full">
            <Text className="text-white font-semibold">Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default notifications