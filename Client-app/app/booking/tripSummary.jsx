import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Paystack, paystackProps } from "react-native-paystack-webview";


const TripSummary = () => {
  const tripDetails = {
    from: "New York",
    to: "Boston",
    date: "March 15, 2024",
    time: "09:00 AM",
    duration: "4h 30m",
    busType: "Deluxe",
    seatNumber: "A12",
    price: 49.99,
    passengerName: "John Doe",
  };
  
   const tpublicKey = "pk_test_5c09eeaebfd1ad052f9f510ef61f3d12de3f7a30";
   //const rpublicKey = "pk_live_93f376041125a45e638e99c310c8b13345503945";
   const paystackWebViewRef = useRef(paystackProps.PayStackRef);

   const handlePaymentCard = () => {
     paystackWebViewRef.current.startTransaction();
   };

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='p-4'>
        <View className='mb-6'>
          <Text className='text-gray-500 mt-1'>
            Review your booking details
          </Text>
        </View>

        <View className='bg-white rounded-xl p-4 shadow-sm mb-4'>
          <View className='flex-row items-center justify-between mb-4'>
            <View className='flex-1'>
              <Text className='text-lg font-semibold text-gray-800'>
                {tripDetails.from}
              </Text>
              <Text className='text-gray-500'>Departure</Text>
            </View>
            <View className='items-center'>
              <Ionicons name='arrow-forward' size={24} color='#6B7280' />
              <Text className='text-gray-500 text-sm'>
                {tripDetails.duration}
              </Text>
            </View>
            <View className='flex-1 items-end'>
              <Text className='text-lg font-semibold text-gray-800'>
                {tripDetails.to}
              </Text>
              <Text className='text-gray-500'>Arrival</Text>
            </View>
          </View>

          <View className='border-t border-gray-100 pt-4'>
            <View className='flex-row justify-between mb-2'>
              <Text className='text-gray-600'>Date</Text>
              <Text className='text-gray-800 font-medium'>
                {tripDetails.date}
              </Text>
            </View>
            <View className='flex-row justify-between mb-2'>
              <Text className='text-gray-600'>Time</Text>
              <Text className='text-gray-800 font-medium'>
                {tripDetails.time}
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-gray-600'>Bus Type</Text>
              <Text className='text-gray-800 font-medium'>
                {tripDetails.busType}
              </Text>
            </View>
          </View>
        </View>

        <View className='bg-white rounded-xl p-4 shadow-sm mb-4'>
          <Text className='text-lg font-semibold text-gray-800 mb-3'>
            Passenger Details
          </Text>
          <View className='flex-row justify-between mb-2'>
            <Text className='text-gray-600'>Name</Text>
            <Text className='text-gray-800 font-medium'>
              {tripDetails.passengerName}
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-600'>Seat Number</Text>
            <Text className='text-gray-800 font-medium'>
              {tripDetails.seatNumber}
            </Text>
          </View>
        </View>

        <View className='bg-white rounded-xl p-4 shadow-sm mb-6'>
          <Text className='text-lg font-semibold text-gray-800 mb-3'>
            Price Details
          </Text>
          <View className='flex-row justify-between mb-2'>
            <Text className='text-gray-600'>Base Fare</Text>
            <Text className='text-gray-800'>${tripDetails.price}</Text>
          </View>
          <View className='border-t border-gray-100 pt-3 mt-2'>
            <View className='flex-row justify-between'>
              <Text className='text-lg font-semibold text-gray-800'>Total</Text>
              <Text className='text-lg font-semibold text-orange-600'>
                ${(tripDetails.price + 5).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePaymentCard}
          className='bg-orange-600 rounded-xl py-4 mb-3'>
          <Text className='text-white text-center font-semibold text-lg'>
            Proceed to Payment
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity className="bg-gray-100 rounded-xl py-4">
          <Text className="text-gray-600 text-center font-semibold text-lg">Edit Booking</Text>
        </TouchableOpacity> */}
      </View>
      <Paystack
        paystackKey={tpublicKey}
        amount={"34000.00"}
        billingEmail='ukeme2388@gmail.com'
        activityIndicatorColor='#ea580c'
        billingMobile='09110307749'
        billingName='Uksman Etuk'
        channels=''
        onSuccess={(tranRef) => {
          console.log(tranRef);
        }}
        onCancel={() => {
          console.log("something went wrong");
        }}
        ref={paystackWebViewRef}
      />
    </View>
  );
};

export default TripSummary;