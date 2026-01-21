import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search fish species..."}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 20, // Extra top padding for mobile
    backgroundColor: '#f8f8f8',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SearchBar;