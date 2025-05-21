import { create } from 'zustand';

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

const useBookingStore = create((set, get) => ({
  // Trip type
  tripType: "roundtrip",
  setTripType: (type) => set({ tripType: type }),

  // Dates
  departureDate: new Date(),
  returnDate: new Date(),
  showDeparturePicker: false,
  showReturnPicker: false,
  setShowDeparturePicker: (show) => set({ showDeparturePicker: show }),
  setShowReturnPicker: (show) => set({ showReturnPicker: show }),
  handleDateChange: (event, selectedDate, type) => {
    if (type === 'departure') {
      set({ showDeparturePicker: false });
      if (selectedDate) {
        set({ departureDate: selectedDate });
      }
    } else {
      set({ showReturnPicker: false });
      if (selectedDate) {
        set({ returnDate: selectedDate });
      }
    }
  },

  // Passengers
  adults: 2,
  children: 1,
  setAdults: (count) => set({ adults: count }),
  setChildren: (count) => set({ children: count }),

  // Locations
  fromLocation: "Lagos",
  toLocation: "Abuja",
  fromTerminal: "Ojota Bus Terminal",
  toTerminal: "Utako Motor Park",
  showLocationModal: false,
  locationType: "from",
  searchQuery: "",
  recentLocations: [],
  setShowLocationModal: (show) => set({ showLocationModal: show }),
  setLocationType: (type) => set({ locationType: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  handleLocationSelect: (location) => {
    const { locationType } = get();
    if (locationType === "from") {
      set({ 
        fromLocation: location.city,
        fromTerminal: location.terminal
      });
    } else {
      set({ 
        toLocation: location.city,
        toTerminal: location.terminal
      });
    }
    // Add to recent locations
    set((state) => ({
      recentLocations: [location, ...state.recentLocations.filter(loc => loc.id !== location.id)].slice(0, 3),
      showLocationModal: false,
      searchQuery: ""
    }));
  },
  openLocationPicker: (type) => set({ 
    locationType: type,
    showLocationModal: true,
    searchQuery: ""
  }),
  handleSwapLocations: () => {
    const { fromLocation, toLocation, fromTerminal, toTerminal } = get();
    set({
      fromLocation: toLocation,
      fromTerminal: toTerminal,
      toLocation: fromLocation,
      toTerminal: fromTerminal
    });
  },

  // Loading
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Computed values
  getFilteredLocations: () => {
    const { searchQuery } = get();
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
  }
}));

export default useBookingStore; 