import { Drawer } from "expo-router/drawer";
import { DrawerItemList } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const router = useRouter();

  const CustomDrawerContent = (props) => {
    return (
      <View {...props}>
        <LinearGradient
          colors={["#ea580c", "#fb923c"]} // orange-600 to orange-400
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 20,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}>
          <View className='flex-row justify-between items-start mb-5'>
            <View className='flex-row items-center flex-1'>
              <View className='w-12 h-12 rounded-full bg-white/20 justify-center items-center mr-4'>
                <MaterialIcons name='person' size={32} color='#fff' />
              </View>
              <View className='flex-1'>
                <Text className='text-white text-lg font-bold mb-1'>
                  Uksman
                </Text>
                <Text className='text-white/80 text-sm'>Premium Member</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.closeDrawer()}
              className='p-2'>
              <MaterialIcons name='close' size={24} color='#fff' />
            </TouchableOpacity>
          </View>

          <View className='flex-row justify-between items-center'>
            <View className='flex-1'>
              <Text className='text-white/80 text-sm'>Travel Points</Text>
              <View className='flex-row items-center'>
                <MaterialIcons name='star' size={22} color='#ffb300' />
                <Text className='text-white text-xl font-bold'>2,450</Text>
              </View>
            </View>
            <TouchableOpacity
              className='bg-white/20 px-4 py-2 rounded-full'
              onPress={() => router.push("/profile")}>
              <Text className='text-white text-sm'>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View className='p-3'>
          <DrawerItemList {...props} />
        </View>

        <TouchableOpacity
          className='flex-row  rounded-xl items-center m-5 p-2 mt-5 justify-center border border-orange-400'
          onPress={() => {
            router.replace("/login");
          }}>
          <MaterialIcons name='logout' size={24} color='#FF3B30' />
          <Text className='text-red-500 text-base ml-2.5'>Logout</Text>
        </TouchableOpacity>
        <View className='items-center justify-center mt-32'>
          <Text className='text-base text-gray-300'>AKTC</Text>
          <Text className='text-gray-300'>Version 1.2.0</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FF6B00",
          },
          headerTintColor: "#fff",
          drawerStyle: {
            backgroundColor: "#fff",
          },
          drawerActiveBackgroundColor: "#f7f7f7",
          drawerActiveTintColor: "#FF6B00",
          drawerInactiveTintColor: "#8c8573",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name='(tabs)'
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name='home' size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name='myTickets'
          options={{
            drawerLabel: "My Tickets",
            title: "My Tickets",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons
                name='confirmation-number'
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='myBookings'
          options={{
            drawerLabel: "My Bookings",
            title: "My Bookings",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name='book-online' size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name='tripHistory'
          options={{
            drawerLabel: "Trip History",
            title: "Trip History",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name='history' size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}
