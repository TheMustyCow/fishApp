import React, { useState, useEffect } from 'react';
import { Platform, View, Text } from 'react-native';
import WebMap from './WebMap';

const Map = ({ pins, onLongPress, searchFilter }) => {
  const [MobileMapComponent, setMobileMapComponent] = useState(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Dynamically import mobile map only on native platforms
      import('./MobileMap').then(module => {
        setMobileMapComponent(() => module.default);
      });
    }
  }, []);

  if (Platform.OS === 'web') {
    return <WebMap pins={pins} searchFilter={searchFilter} />;
  }

  if (MobileMapComponent) {
    return <MobileMapComponent pins={pins} onLongPress={onLongPress} searchFilter={searchFilter} />;
  }

  // Loading state for mobile
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading map...</Text>
    </View>
  );
};

export default Map;