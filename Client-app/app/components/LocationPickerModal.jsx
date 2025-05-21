import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function LocationPickerModal({
  visible,
  locationType,
  searchQuery,
  recentLocations,
  filteredLocations,
  onClose,
  onSearchChange,
  onLocationSelect
}) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <View className="bg-orange-500 p-4 flex-row items-center justify-between">
          <Text className="text-white text-lg font-bold">
            Select {locationType === "from" ? "Departure" : "Arrival"} Location
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="p-4">
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 mb-4">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 p-3"
              placeholder="Search by city or terminal..."
              value={searchQuery}
              onChangeText={onSearchChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => onSearchChange("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            ) : null}
          </View>

          <ScrollView>
            {!searchQuery && recentLocations.length > 0 && (
              <View className="mb-4">
                <Text className="text-gray-500 text-sm mb-2 px-4">Recent Locations</Text>
                {recentLocations.map((location) => (
                  <TouchableOpacity
                    key={`recent-${location.id}`}
                    className="p-4 border-b border-gray-200 bg-gray-50"
                    onPress={() => onLocationSelect(location)}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={20} color="#666" className="mr-2" />
                      <View>
                        <Text className="text-lg font-bold">{location.city}</Text>
                        <Text className="text-gray-500">{location.terminal}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                <View className="h-4" />
              </View>
            )}

            {searchQuery && filteredLocations.length === 0 ? (
              <View className="p-4 items-center">
                <Ionicons name="search-outline" size={48} color="#ccc" />
                <Text className="text-gray-500 mt-2">No locations found</Text>
                <Text className="text-gray-400 text-sm">Try different keywords</Text>
              </View>
            ) : (
              filteredLocations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  className="p-4 border-b border-gray-200"
                  onPress={() => onLocationSelect(location)}
                >
                  <View className="flex-row items-center">
                    <Ionicons 
                      name="location-outline" 
                      size={20} 
                      color="#f97316" 
                      className="mr-2" 
                    />
                    <View>
                      <Text className="text-lg font-bold">{location.city}</Text>
                      <Text className="text-gray-500">{location.terminal}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
} 