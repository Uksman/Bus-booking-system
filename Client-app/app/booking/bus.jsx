import { View, Text, ScrollView, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Bus() {
  const router = useRouter()

  const busData = [
    {
      id: 1,
      name: "AKTC",
      logo: require("../../assets/images/bus.png"),
      type: "Ac",
      depart: "6:01 PM",
      arrive: "9:28 PM",
      duration: "3 hr 27 min",
      seatsLeft: 35,
      price: "$154.98",
      color: "bg-[#ffe8e0]",
    },
    {
      id: 2,
      name: "AKTC",
      logo: require("../../assets/images/bus.png"),
      type: "Non-Ac",
      depart: "1:55 PM",
      arrive: "7:00 PM",
      duration: "4 hr 5 min",
      seatsLeft: 43,
      price: "$187.54",
      color: "bg-[#e3ecff]",
    },
    {
      id: 3,
      name: "AKTC",
      logo: require("../../assets/images/bus1.png"),
      type: "Non-Ac",
      depart: "6:25 PM",
      arrive: "8:56 PM",
      duration: "5 hr 31 min",
      seatsLeft: 23,
      price: "$168.90",
      color: "bg-[#fce4ec]",
    },
  ];

  return (
    <View className='flex-1 bg-white px-4 pt-10'>
      <View className='flex-row justify-between items-center mb-4'>
        <View>
          <Text className='text-black text-xl font-bold'>Calabar</Text>
          <Text className='text-gray-600'>Calabar Terminal</Text>
        </View>
        <Feather name='repeat' size={20} color='black' />
        <View className='items-end'>
          <Text className='text-black text-xl font-bold'>Kaduna</Text>
          <Text className='text-gray-600'>Kaduna Central Park</Text>
        </View>
      </View>

      {/* Dates */}
      <View className='flex-row justify-between mb-4'>
        <View className='flex-1 mr-2 bg-gray-100 p-3 rounded-xl'>
          <Text className='text-gray-600'>Departure</Text>
          <Text className='text-black font-semibold'>Jun 15th, 2023</Text>
        </View>
        <View className='flex-1 ml-2 bg-gray-100 p-3 rounded-xl'>
          <Text className='text-gray-600'>Return</Text>
          <Text className='text-black font-semibold'>Jun 17th, 2023</Text>
        </View>
      </View>

      {/* Bus List */}
      <ScrollView className=''>
        {busData.map((bus) => (
          <TouchableOpacity
            onPress={() => router.push("/booking/busDetails")}
            key={bus.id}
            className={`rounded-2xl mt-6 p-6 ${bus.color} shadow-sm`}>
            <View className='flex-row items-center justify-between mb-2'>
              <View className='flex-row items-center space-x-2'>
                <Image
                  style={{
                    resizeMode: "contain",
                  }}
                  source={bus.logo}
                  className='w-24 h-20'
                />
                {/* <Text className='text-black font-semibold'>{bus.name}</Text> */}
              </View>
              <Text className='text-gray-700'>{bus.type}</Text>
            </View>

            <View className='flex-row justify-between items-center mt-2'>
              <View className='items-center'>
                <Text className='text-black text-lg'>{bus.depart}</Text>
                <Text>Depart</Text>
              </View>
              <View className='items-center'>
                <Feather name='more-horizontal' size={20} color='gray' />
                <View className='w-10 h-10 absolute -top-36 bg-white rounded-full -mb-2' />
                <View className='w-10 h-10 absolute top-16 bg-white rounded-full -mb-2' />
                <Text className='text-gray-600 text-xs'>{bus.duration}</Text>
              </View>
              <View className='items-center'>
                <Text className='text-black text-lg'>{bus.arrive}</Text>
                <Text>Arrive</Text>
              </View>
            </View>

            <View className='flex-row justify-between mt-3'>
              <Text className='text-gray-700 text-sm'>
                {bus.seatsLeft} seats left
              </Text>
              <Text className='text-red-600 font-semibold'>
                {bus.price}/<Text className='text-xs'>person</Text>
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
