import React from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import LocationSelector from "../../components/LocationSelector";
import TripTypeSelector from "../../components/TripTypeSelector";
import DateSelector from "../../components/DateSelector";
import PassengerCounter from "../../components/PassengerCounter";
import LocationPickerModal from "../../components/LocationPickerModal";
import useBookingStore from "../../store/useBookingStore";

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
  const router = useRouter();
  const {
    // Trip type
    tripType,
    setTripType,

    // Dates
    departureDate,
    returnDate,
    showDeparturePicker,
    showReturnPicker,
    setShowDeparturePicker,
    setShowReturnPicker,
    handleDateChange,

    // Passengers
    adults,
    setAdults,
    children,
    setChildren,

    // Locations
    fromLocation,
    toLocation,
    fromTerminal,
    toTerminal,
    showLocationModal,
    setShowLocationModal,
    locationType,
    searchQuery,
    recentLocations,
    handleLocationSelect,
    openLocationPicker,
    handleSwapLocations,
    setSearchQuery,
    getFilteredLocations,

    // Loading
    isLoading,
    setIsLoading
  } = useBookingStore();

  const handleFindBus = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/booking/bus');
    }, 1000);
  };

  return (
    <ScrollView className='flex-1'>
      <Header />

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
        <Text className='text-gray-500 text-base'>Lets book</Text>
        <Text className='text-black text-2xl font-bold mb-5'>
          your next bus
        </Text>

        <LocationSelector
          fromLocation={fromLocation}
          toLocation={toLocation}
          fromTerminal={fromTerminal}
          toTerminal={toTerminal}
          onSwapLocations={handleSwapLocations}
          onLocationPress={openLocationPicker}
        />

        <TripTypeSelector
          tripType={tripType}
          onTripTypeChange={setTripType}
        />

        <DateSelector
          departureDate={departureDate}
          returnDate={returnDate}
          tripType={tripType}
          showDeparturePicker={showDeparturePicker}
          showReturnPicker={showReturnPicker}
          onDepartureDateChange={(event, date) => handleDateChange(event, date, 'departure')}
          onReturnDateChange={(event, date) => handleDateChange(event, date, 'return')}
          onDeparturePress={() => setShowDeparturePicker(true)}
          onReturnPress={() => setShowReturnPicker(true)}
        />

        <View className='flex-row justify-between mb-8'>
          <PassengerCounter
            label="Adult"
            count={adults}
            onDecrease={() => setAdults(Math.max(adults - 1, 0))}
            onIncrease={() => setAdults(adults + 1)}
          />
          <PassengerCounter
            label="Children"
            count={children}
            onDecrease={() => setChildren(Math.max(children - 1, 0))}
            onIncrease={() => setChildren(children + 1)}
          />
        </View>

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

      <LocationPickerModal
        visible={showLocationModal}
        locationType={locationType}
        searchQuery={searchQuery}
        recentLocations={recentLocations}
        filteredLocations={getFilteredLocations()}
        onClose={() => setShowLocationModal(false)}
        onSearchChange={setSearchQuery}
        onLocationSelect={handleLocationSelect}
      />
    </ScrollView>
  );
}
