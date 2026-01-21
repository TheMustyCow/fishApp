import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { height: screenHeight } = Dimensions.get('window');

// Default location (San Francisco) if GPS not available
const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MobileMap = ({ pins, onLongPress, searchFilter }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied - using default location');
        setMapReady(true);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not get location - using default location');
      }
      setMapReady(true);
    })();
  }, []);

  const filteredPins = pins.filter(pin =>
    searchFilter === '' ||
    pin.entries.some(entry =>
      entry.species.toLowerCase().includes(searchFilter.toLowerCase())
    )
  );

  const initialRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : DEFAULT_REGION;

  if (!mapReady) {
    return (
      <View style={[styles.container, styles.loading]}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {errorMsg && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={false}
        onLongPress={onLongPress}
        initialRegion={initialRegion}
      >
        {filteredPins.map((pin, index) => (
          <Marker
            key={`${pin.latitude}-${pin.longitude}-${index}`}
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            title={`${pin.entries.length} catch${pin.entries.length > 1 ? 'es' : ''}`}
            description={pin.entries.map(entry => `${entry.species} (${entry.count})`).join(', ')}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: screenHeight * 0.6, // Adjusted for logo and search bar
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBanner: {
    backgroundColor: '#ffeaa7',
    padding: 10,
    alignItems: 'center',
  },
  errorText: {
    color: '#d63031',
    fontSize: 14,
  },
});

export default MobileMap;