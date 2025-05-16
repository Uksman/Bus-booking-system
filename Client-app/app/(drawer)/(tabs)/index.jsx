import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Sample locations data - you can replace this with your actual locations
const LOCATIONS = [
  { id: 1, city: "Lagos", terminal: "Ojota Bus Terminal" },
  { id: 2, city: "Abuja", terminal: "Utako Motor Park" },
  { id: 3, city: "Port Harcourt", terminal: "Mile 1 Motor Park" },
  { id: 4, city: "Kano", terminal: "Kano Central Motor Park" },
  { id: 5, city: "Ibadan", terminal: "Ibadan Central Terminal" },
  { id: 6, city: "Enugu", terminal: "Enugu Motor Park" },
  { id: 7, city: "Calabar", terminal: "Calabar Terminal" },
  { id: 8, city: "Benin", terminal: "Benin Central Park" },
  { id: 9, city: "Kaduna", terminal: "Kaduna Central Park" },
];

export default function HomeScreen() {
  const [tripType, setTripType] = useState("roundtrip");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fromLocation, setFromLocation] = useState("Lagos");
  const [toLocation, setToLocation] = useState("Abuja");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationType, setLocationType] = useState("from"); // "from" or "to"
  const [searchQuery, setSearchQuery] = useState("");
  const [fromTerminal, setFromTerminal] = useState("Ojota Bus Terminal");
  const [toTerminal, setToTerminal] = useState("Utako Motor Park");
  const [recentLocations, setRecentLocations] = useState([]);

  const router = useRouter();
  const navigate = useNavigation()

  const handleDateChange = (event, selectedDate, type) => {
    if (type === 'departure') {
      setShowDeparturePicker(false);
      if (selectedDate) {
        setDepartureDate(selectedDate);
      }
    } else {
      setShowReturnPicker(false);
      if (selectedDate) {
        setReturnDate(selectedDate);
      }
    }
  };

  const handleFindBus = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/booking/bus');
    }, 1000);
  };

  const handleLocationSelect = (location) => {
    if (locationType === "from") {
      setFromLocation(location.city);
      setFromTerminal(location.terminal);
    } else {
      setToLocation(location.city);
      setToTerminal(location.terminal);
    }
    // Add to recent locations
    setRecentLocations(prev => {
      const filtered = prev.filter(loc => loc.id !== location.id);
      return [location, ...filtered].slice(0, 3);
    });
    setShowLocationModal(false);
    setSearchQuery("");
  };

  const openLocationPicker = (type) => {
    setLocationType(type);
    setShowLocationModal(true);
    setSearchQuery("");
  };

  const filteredLocations = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return LOCATIONS;
    }

    const query = searchQuery.toLowerCase().trim();
    return LOCATIONS.filter(location => {
      const cityMatch = location.city.toLowerCase().includes(query);
      const terminalMatch = location.terminal.toLowerCase().includes(query);
      const fullMatch = `${location.city} ${location.terminal}`.toLowerCase().includes(query);
      return cityMatch || terminalMatch || fullMatch;
    });
  }, [searchQuery]);

  const LocationPickerModal = () => (
    <Modal
      visible={showLocationModal}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowLocationModal(false)}
    >
      <View className="flex-1 bg-white">
        <View className="bg-orange-500 p-4 flex-row items-center justify-between">
          <Text className="text-white text-lg font-bold">
            Select {locationType === "from" ? "Departure" : "Arrival"} Location
          </Text>
          <TouchableOpacity onPress={() => setShowLocationModal(false)}>
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
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
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
                    onPress={() => handleLocationSelect(location)}
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
                  onPress={() => handleLocationSelect(location)}
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

  return (
    <ScrollView className='flex-1'>
      {/* Header */}
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
            <TouchableOpacity onPress={ ()=> navigate.openDrawer()} className='bg-white p-2 rounded-full'>
              <Ionicons name='menu' size={20} color='#f97316' />
            </TouchableOpacity>
        </View>
        </View>
      </View>

      <View className='p-5'>
        <View className='mb-5 items-center'>
          <Image
            source={require("../../../assets/images/download.jpeg")}
            style={{
              width: width * 0.9,
              height: height * 0.2,
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
        </View>
        <Text className='text-gray-500 text-base'>Let's book</Text>
        <Text className='text-black text-2xl font-bold mb-5'>
          your next bus
        </Text>

        {/* From / To */}
        <View className='flex-row justify-between items-center mb-5 bg-gray-50 p-4 rounded-xl'>
          <TouchableOpacity 
            className='w-[40%]' 
            onPress={() => openLocationPicker("from")}>
            <Text className='text-xs text-gray-500'>From</Text>
            <Text className='text-black text-xl font-bold'>{fromLocation}</Text>
            <Text className='text-xs text-gray-400'>{fromTerminal}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className='bg-white p-2 rounded-full shadow-sm'
            onPress={() => {
              const tempLocation = fromLocation;
              const tempTerminal = fromTerminal;
              setFromLocation(toLocation);
              setFromTerminal(toTerminal);
              setToLocation(tempLocation);
              setToTerminal(tempTerminal);
            }}>
            <Ionicons name='swap-horizontal' size={24} color='#f97316' />
          </TouchableOpacity>
          <TouchableOpacity 
            className='w-[40%]' 
            onPress={() => openLocationPicker("to")}>
            <Text className='text-xs text-gray-500'>To</Text>
            <Text className='text-black text-xl font-bold'>{toLocation}</Text>
            <Text className='text-xs text-gray-400'>{toTerminal}</Text>
          </TouchableOpacity>
        </View>

        {/* Trip Type Toggle */}
        <View className='flex-row bg-gray-50 rounded-full my-5 p-1'>
        <TouchableOpacity
            className={`flex-1 items-center py-2 rounded-full ${
              tripType === "oneway" ? "bg-orange-500" : ""
            }`}
          onPress={() => setTripType("oneway")}>
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
          onPress={() => setTripType("roundtrip")}>
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

      {/* Dates */}
        <View className='flex-row justify-between mb-5'>
          <TouchableOpacity 
            className='w-[48%] bg-gray-50 p-4 rounded-xl'
            onPress={() => setShowDeparturePicker(true)}>
            <Text className='text-xs text-gray-500'>Departure</Text>
            <Text className='text-black text-base'>
              {departureDate.toDateString()}
            </Text>
          </TouchableOpacity>
          {tripType === "roundtrip" && (
            <TouchableOpacity 
              className='w-[48%] bg-gray-50 p-4 rounded-xl'
              onPress={() => setShowReturnPicker(true)}>
              <Text className='text-xs text-gray-500'>Return</Text>
              <Text className='text-black text-base'>
                {returnDate.toDateString()}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Date Pickers */}
        {showDeparturePicker && (
          <DateTimePicker
            value={departureDate}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'departure')}
            minimumDate={new Date()}
          />
        )}
        {showReturnPicker && (
          <DateTimePicker
            value={returnDate}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'return')}
            minimumDate={departureDate}
          />
        )}

      {/* Passenger Count */}
        <View className='flex-row justify-between mb-8'>
          <View className='w-[48%]'>
            <Text className='text-sm text-gray-600 mb-2'>Adult</Text>
            <View className='flex-row items-center justify-between bg-gray-50 p-3 rounded-xl'>
            <TouchableOpacity
                onPress={() => setAdults(Math.max(adults - 1, 0))}
                className='bg-gray-200 p-2 rounded-lg'>
                <Text className='text-black text-lg px-2'>-</Text>
            </TouchableOpacity>
              <Text className='text-black text-base'>{adults}</Text>
              <TouchableOpacity 
                onPress={() => setAdults(adults + 1)}
                className='bg-gray-200 p-2 rounded-lg'>
                <Text className='text-black text-lg px-2'>+</Text>
            </TouchableOpacity>
          </View>
        </View>
          <View className='w-[48%]'>
            <Text className='text-sm text-gray-600 mb-2'>Children</Text>
            <View className='flex-row items-center justify-between bg-gray-50 p-3 rounded-xl'>
            <TouchableOpacity
                onPress={() => setChildren(Math.max(children - 1, 0))}
                className='bg-gray-200 p-2 rounded-lg'>
                <Text className='text-black text-lg px-2'>-</Text>
            </TouchableOpacity>
              <Text className='text-black text-base'>{children}</Text>
              <TouchableOpacity 
                onPress={() => setChildren(children + 1)}
                className='bg-gray-200 p-2 rounded-lg'>
                <Text className='text-black text-lg px-2'>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Find Bus Button */}
        <TouchableOpacity 
          onPress={handleFindBus}
          disabled={isLoading}
          className='bg-orange-500 p-3 rounded-xl items-center flex-row justify-center space-x-2'>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className='text-white font-bold text-base'>Find Your Bus</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </>
          )}
      </TouchableOpacity>
      </View>

      <LocationPickerModal />
    </ScrollView>
  );
}
