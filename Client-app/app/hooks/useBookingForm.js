import { useState, useMemo } from 'react';

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

export default function useBookingForm() {
  // Trip type state
  const [tripType, setTripType] = useState("roundtrip");

  // Date states
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  // Passenger states
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  // Location states
  const [fromLocation, setFromLocation] = useState("Lagos");
  const [toLocation, setToLocation] = useState("Abuja");
  const [fromTerminal, setFromTerminal] = useState("Ojota Bus Terminal");
  const [toTerminal, setToTerminal] = useState("Utako Motor Park");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationType, setLocationType] = useState("from");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentLocations, setRecentLocations] = useState([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Date handlers
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

  // Location handlers
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

  const handleSwapLocations = () => {
    const tempLocation = fromLocation;
    const tempTerminal = fromTerminal;
    setFromLocation(toLocation);
    setFromTerminal(toTerminal);
    setToLocation(tempLocation);
    setToTerminal(tempTerminal);
  };

  // Filtered locations
  const filteredLocations = useMemo(() => {
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

  return {
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
    locationType,
    searchQuery,
    recentLocations,
    handleLocationSelect,
    openLocationPicker,
    handleSwapLocations,
    setSearchQuery,
    filteredLocations,

    // Loading
    isLoading,
    setIsLoading
  };
} 