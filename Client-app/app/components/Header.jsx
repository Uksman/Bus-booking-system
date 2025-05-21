import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigate = useNavigation();

  return (
    <View className='bg-orange-500 rounded-b-3xl p-5 mb-6 shadow-sm'>
      <View className='flex-row justify-between items-center'>
        <View>
          <Text className='text-white text-sm'>Welcome,</Text>
          <Text className='text-2xl font-extrabold text-white'>Uksman</Text>
        </View>
        <View className='flex-row items-center space-x-3'>
          <TouchableOpacity className='bg-white p-2 rounded-full'>
            <Ionicons name='notifications-sharp' size={20} color='#f97316' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate.openDrawer()} className='bg-white p-2 rounded-full'>
            <Ionicons name='menu' size={20} color='#f97316' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} 