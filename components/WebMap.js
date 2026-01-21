import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WebMap = ({ pins, searchFilter }) => {
  const filteredPins = pins.filter(pin =>
    searchFilter === '' ||
    pin.entries.some(entry =>
      entry.species.toLowerCase().includes(searchFilter.toLowerCase())
    )
  );

  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.title}>🗺️ Fishing Map</Text>
        <Text style={styles.subtitle}>Interactive map available on mobile devices</Text>
        <Text style={styles.instruction}>Long press on mobile to add fishing entries</Text>

        {filteredPins.length > 0 && (
          <ScrollView style={styles.pinList}>
            <Text style={styles.pinListTitle}>Fishing Locations:</Text>
            {filteredPins.map((pin, index) => (
              <View key={index} style={styles.pinItem}>
                <Text style={styles.pinText}>
                  📍 {pin.entries.length} catch{pin.entries.length > 1 ? 'es' : ''} at ({pin.latitude.toFixed(4)}, {pin.longitude.toFixed(4)})
                </Text>
                <Text style={styles.pinDetails}>
                  {pin.entries.map(entry => `${entry.species} (${entry.count})`).join(', ')}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        {filteredPins.length === 0 && (
          <Text style={styles.emptyText}>No fishing entries yet. Add some on mobile!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  pinList: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 300,
  },
  pinListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pinItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pinText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  pinDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default WebMap;