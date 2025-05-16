import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const seatRows = 6;
const seatColumns = 4; // 2 seats on each side of the aisle

// Example of booked seats
const bookedSeats = ["S3", "S5", "S10", "S16", "S22"];

const SeatSelection = () => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatToggle = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const renderSeats = () => {
    let seatLayout = [];
    let seatNumber = 1;

    for (let row = 0; row < seatRows; row++) {
      let rowSeats = [];

      for (let col = 0; col < seatColumns; col++) {
        if (col === 2) {
          rowSeats.push(
            <View key={`aisle-${row}-${col}`} style={{ width: 32 }} />
          );
        }

        const seatId = `S${seatNumber}`;
        const isBooked = bookedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        rowSeats.push(
          <TouchableOpacity
            key={seatId}
            disabled={isBooked}
            onPress={() => handleSeatToggle(seatId)}
            style={{
              width: 52,
              height: 52,
              margin: 4,
              borderRadius: 8,
              backgroundColor: isBooked
                ? "#ccc"
                : isSelected
                ? "#dc2626"
                : "#d1d5db",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>{seatId}</Text>
          </TouchableOpacity>
        );

        seatNumber++;
      }

      seatLayout.push(
        <View
          key={`row-${row}`}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 12,
          }}>
          {rowSeats}
        </View>
      );
    }

    return seatLayout;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ position: "relative", height: 400 }}>
        <Image
          resizeMode='cover'
          style={{ width: "100%", height: "100%" }}
          source={require("../../assets/images/bus.jpeg")}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 16,
              padding: 16,
              width: "90%",
            }}>
            {renderSeats()}
          </View>
        </View>
      </View>

      {/* Selected Seats */}
      <View
        style={{
          backgroundColor: "#f3f4f6",
          padding: 16,
          borderRadius: 12,
          margin: 16,
        }}>
        <Text style={{ color: "#6b7280", fontSize: 16 }}>Selected Seats:</Text>
        <Text
          style={{
            color: "#000",
            fontWeight: "600",
            marginTop: 4,
            fontSize: 16,
          }}>
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        disabled={selectedSeats.length === 0}
        onPress={() => router.push("/booking/travellerDetail")}
        style={{
          backgroundColor: selectedSeats.length === 0 ? "#f25d0d80" : "#f25d0d",
          padding: 16,
          borderRadius: 12,
          margin: 16,
          opacity: selectedSeats.length === 0 ? 0.7 : 1,
        }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SeatSelection;
