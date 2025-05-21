import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function LocationSelector({ 
  fromLocation, 
  toLocation, 
  fromTerminal, 
  toTerminal, 
  onSwapLocations, 
  onLocationPress 
}) {
  return (
    <View className='flex-row justify-between items-center mb-5 bg-gray-50 p-4 rounded-xl'>
      <TouchableOpacity 
        className='w-[40%]' 
        onPress={() => onLocationPress("from")}>
        <Text className='text-xs text-gray-500'>From</Text>
        <Text className='text-black text-xl font-bold'>{fromLocation}</Text>
        <Text className='text-xs text-gray-400'>{fromTerminal}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className='bg-white p-2 rounded-full shadow-sm'
        onPress={onSwapLocations}>
        <Ionicons name='swap-horizontal' size={24} color='#f97316' />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className='w-[40%]' 
        onPress={() => onLocationPress("to")}>
        <Text className='text-xs text-gray-500'>To</Text>
        <Text className='text-black text-xl font-bold'>{toLocation}</Text>
        <Text className='text-xs text-gray-400'>{toTerminal}</Text>
      </TouchableOpacity>
    </View>
  );
} 