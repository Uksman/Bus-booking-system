import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#ff6536",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
          },
        }}>
        <Tabs.Screen
          name='index'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={25}
                name={focused ? "home" : "home"}
                solid={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='Hire'
          options={{
            title: "Hire",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome size={25} name='bus' solid={focused} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='History'
          options={{
            title: "History",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={25}
                name='history'
                solid={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='notifications'
          options={{
            title: "Notifications",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={25}
                name='bell'
                solid={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='Profile'
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                size={25}
                name='user'
                solid={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
