import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>🐟</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 25, // More space on mobile
    backgroundColor: '#f8f8f8',
  },
  logoText: {
    fontSize: 48,
  },
});

export default Logo;