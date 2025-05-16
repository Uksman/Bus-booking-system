import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Index() {
  
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/images/onboardingImg01.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ride Easy, Ride Smart</Text>
        <Text style={styles.subtitle}>
          Your seamless solution for bus bookings and private hires fast,
          flexible, and reliable.
        </Text>
        <TouchableOpacity
          onPress={()=> router.push('/auth/Login')}
          style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    marginTop: -25, // overlap a little with the image
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#011a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5, // for Android shadow
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#e66119",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});


