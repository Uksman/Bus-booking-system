import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";


const BusDetails = () => {
  const router = useRouter();

  // Static data for illustration – in a real app, you'd pass data via route params
  const bus = {
    name: "AKTC",
    logo: require("../../assets/images/bus.png"),
    type: "Ac",
    depart: "6:01 PM",
    arrive: "9:28 PM",
    duration: "3 hr 27 min",
    seatsLeft: 35,
    price: "$154.98",
    terminalFrom: "Enugu Terminal",
    terminalTo: "Kaduna Central Park",
    date: "June 15, 2023",
    fromCoordinates: {
      latitude: 6.459964,
      longitude: 7.548949,
    },
    toCoordinates: {
      latitude: 10.5222,
      longitude: 7.4384,
    }
  };

  return (
    <ScrollView className='flex-1 bg-white p-4'>
      <MapView
        style={{
          width: "100%",
          height: 500,
          marginBottom: 20,
          borderRadius: 20,
        }}
        initialRegion={{
          latitude:
            (bus.fromCoordinates.latitude + bus.toCoordinates.latitude) / 2,
          longitude:
            (bus.fromCoordinates.longitude + bus.toCoordinates.longitude) / 2,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}>
        <Marker
          coordinate={bus.fromCoordinates}
          title='Departure'
          description={bus.terminalFrom}
        />
        <Marker
          coordinate={bus.toCoordinates}
          title='Arrival'
          description={bus.terminalTo}
        />
        <MapViewDirections
          origin={bus.fromCoordinates}
          destination={bus.toCoordinates}
          apikey='AIzaSyCZgbWdPuGHyYp2JX2iChQzgKMhBDXa4qg'
          strokeWidth={3}
          strokeColor='#FF6B00'
        />
      </MapView>

      {/* Bus Info */}
      <View className='bg-gray-100 rounded-2xl p-4 mb-6'>
        <View className='flex-row items-center justify-between mb-3'>
          <View className='flex-row items-center space-x-3'>
            <Image
              source={bus.logo}
              className='w-24 h-20'
              resizeMode='contain'
            />
          </View>
          <View className='items-center'>
            <Text className='text-xl font-semibold text-black'>{bus.name}</Text>
            <Text className='text-gray-600'>{bus.type}</Text>
          </View>
          <Text className='text-red-600 font-bold text-lg'>{bus.price}</Text>
        </View>

        <View className='flex-row justify-between mb-2'>
          <View>
            <Text className='text-gray-600'>Departure</Text>
            <Text className='text-black'>{bus.depart}</Text>
            <Text className='text-gray-500 text-sm'>{bus.terminalFrom}</Text>
          </View>
          <View className='items-center'>
            <Feather name='more-horizontal' size={20} color='gray' />
            <Text className='text-gray-500 text-xs mt-1'>{bus.duration}</Text>
          </View>
          <View>
            <Text className='text-gray-600'>Arrival</Text>
            <Text className='text-black'>{bus.arrive}</Text>
            <Text className='text-gray-500 text-sm'>{bus.terminalTo}</Text>
          </View>
        </View>
      </View>

      {/* Trip Info */}
      <View className='bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm'>
        <Text className='text-gray-600 mb-1'>Date</Text>
        <Text className='text-black font-semibold'>{bus.date}</Text>
        <Text className='text-gray-600 mt-4 mb-1'>Available Seats</Text>
        <Text className='text-black font-semibold'>
          {bus.seatsLeft} seats left
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/booking/seats")}
        className='bg-orange-500 p-4 rounded-xl mt-6'>
        <Text className='text-white text-center font-bold text-lg'>
          Select Seats
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BusDetails;
