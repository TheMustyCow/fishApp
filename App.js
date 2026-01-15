import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import EntryForm from './components/EntryForm';

const STORAGE_KEY = 'fishing_entries';

export default function App() {
  const [pins, setPins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [entryFormVisible, setEntryFormVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Load data on app start
  useEffect(() => {
    loadPins();
  }, []);

  // Save data whenever pins change
  useEffect(() => {
    savePins();
  }, [pins]);

  const loadPins = async () => {
    try {
      const savedPins = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPins) {
        setPins(JSON.parse(savedPins));
      }
    } catch (error) {
      console.error('Error loading pins:', error);
    }
  };

  const savePins = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
    } catch (error) {
      console.error('Error saving pins:', error);
    }
  };

  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    setEntryFormVisible(true);
  };

  const handleAddEntry = (entry) => {
    const newPin = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      entries: [entry],
    };

    // Check if pin already exists at this location
    const existingPinIndex = pins.findIndex(pin =>
      Math.abs(pin.latitude - selectedLocation.latitude) < 0.0001 &&
      Math.abs(pin.longitude - selectedLocation.longitude) < 0.0001
    );

    if (existingPinIndex >= 0) {
      // Add entry to existing pin
      const updatedPins = [...pins];
      updatedPins[existingPinIndex].entries.push(entry);
      setPins(updatedPins);
    } else {
      // Create new pin
      setPins([...pins, newPin]);
    }

    Alert.alert('Success', 'Fishing entry added successfully!');
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search fish species..."
      />
      <Map
        pins={pins}
        onLongPress={handleLongPress}
        searchFilter={searchQuery}
      />
      <EntryForm
        visible={entryFormVisible}
        onClose={() => setEntryFormVisible(false)}
        onSubmit={handleAddEntry}
        location={selectedLocation}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
