import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, SafeAreaView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './components/Logo';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Logo />
         <SearchBar
           value={searchQuery}
           onChangeText={setSearchQuery}
           placeholder="Search fish species..."
         />
         <View style={{ height: 100 }} />
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
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 0, // Push content down from the top
    paddingTop: Platform.OS === 'ios' ? 10 : 20, // Additional padding for spacing
  },
});
