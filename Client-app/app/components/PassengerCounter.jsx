import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function PassengerCounter({ 
  label, 
  count, 
  onDecrease, 
  onIncrease 
}) {
  return (
    <View className='w-[48%]'>
      <Text className='text-sm text-gray-600 mb-2'>{label}</Text>
      <View className='flex-row items-center justify-between bg-gray-50 p-3 rounded-xl'>
        <TouchableOpacity
          onPress={onDecrease}
          className='bg-gray-200 p-2 rounded-lg'>
          <Text className='text-black text-lg px-2'>-</Text>
        </TouchableOpacity>
        <Text className='text-black text-base'>{count}</Text>
        <TouchableOpacity 
          onPress={onIncrease}
          className='bg-gray-200 p-2 rounded-lg'>
          <Text className='text-black text-lg px-2'>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 