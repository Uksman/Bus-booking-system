import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAppReady(true);
      } catch (e) {
        setError(e);
        console.warn("Error loading app resources:", e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading app resources. Please try again.</Text>
      </View>
    );
  }

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "white" },
        }}>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='(drawer)'
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='auth/Login'
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name='auth/Register'
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name='booking/bus'
          options={{
            title: "Availble bus",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='booking/busDetails'
          options={{
            title: "Bus Details",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='booking/seats'
          options={{
            title: "Select Seats",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='booking/tripSummary'
          options={{
            title: "Trip Summary",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='booking/travellerDetail'
          options={{
            title: "Travellers",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='hiring/selectBus'
          options={{
            title: "Select Bus",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name='editProfile'
          options={{
            title: "Edit Profile",
            animation: "fade",
          }}
        />
      </Stack>
      <StatusBar hidden={true} />
    </SafeAreaProvider>
  );
}
