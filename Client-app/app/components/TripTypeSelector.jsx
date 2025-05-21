import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function TripTypeSelector({ tripType, onTripTypeChange }) {
  return (
    <View className='flex-row bg-gray-50 rounded-full my-5 p-1'>
      <TouchableOpacity
        className={`flex-1 items-center py-2 rounded-full ${
          tripType === "oneway" ? "bg-orange-500" : ""
        }`}
        onPress={() => onTripTypeChange("oneway")}>
        <Text
          className={`${
            tripType === "oneway" ? "text-white font-bold" : "text-gray-600"
          }`}>
          One way
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className={`flex-1 items-center py-2 rounded-full ${
          tripType === "roundtrip" ? "bg-orange-500" : ""
        }`}
        onPress={() => onTripTypeChange("roundtrip")}>
        <Text
          className={`${
            tripType === "roundtrip"
              ? "text-white font-bold"
              : "text-gray-600"
          }`}>
          Round trip
        </Text>
      </TouchableOpacity>
    </View>
  );
} 