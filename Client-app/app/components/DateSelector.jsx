import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateSelector({ 
  departureDate, 
  returnDate, 
  tripType,
  showDeparturePicker,
  showReturnPicker,
  onDepartureDateChange,
  onReturnDateChange,
  onDeparturePress,
  onReturnPress
}) {
  return (
    <>
      <View className='flex-row justify-between mb-5'>
        <TouchableOpacity 
          className='w-[48%] bg-gray-50 p-4 rounded-xl'
          onPress={onDeparturePress}>
          <Text className='text-xs text-gray-500'>Departure</Text>
          <Text className='text-black text-base'>
            {departureDate.toDateString()}
          </Text>
        </TouchableOpacity>
        
        {tripType === "roundtrip" && (
          <TouchableOpacity 
            className='w-[48%] bg-gray-50 p-4 rounded-xl'
            onPress={onReturnPress}>
            <Text className='text-xs text-gray-500'>Return</Text>
            <Text className='text-black text-base'>
              {returnDate.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {showDeparturePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={onDepartureDateChange}
          minimumDate={new Date()}
        />
      )}
      
      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={onReturnDateChange}
          minimumDate={departureDate}
        />
      )}
    </>
  );
} 