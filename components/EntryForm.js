import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EntryForm = ({ visible, onClose, onSubmit, location }) => {
  const [species, setSpecies] = useState('');
  const [count, setCount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [fishermenCount, setFishermenCount] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const handleSubmit = () => {
    if (!species.trim() || !count || !fishermenCount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const entry = {
      species: species.trim(),
      count: parseInt(count),
      date,
      time,
      fishermenCount: parseInt(fishermenCount),
      difficulty,
    };

    onSubmit(entry);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSpecies('');
    setCount('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().slice(0, 5));
    setFishermenCount('');
    setDifficulty('medium');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Fishing Entry</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fish Species *</Text>
              <TextInput
                style={styles.input}
                value={species}
                onChangeText={setSpecies}
                placeholder="e.g. Bass, Trout, Salmon"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number Caught *</Text>
              <TextInput
                style={styles.input}
                value={count}
                onChangeText={setCount}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Date</Text>
                <TextInput
                  style={styles.input}
                  value={date}
                  onChangeText={setDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={setTime}
                  placeholder="HH:MM"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Other Fishermen *</Text>
              <TextInput
                style={styles.input}
                value={fishermenCount}
                onChangeText={setFishermenCount}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Difficulty</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={difficulty}
                  onValueChange={setDifficulty}
                  style={styles.picker}
                >
                  <Picker.Item label="Easy" value="easy" />
                  <Picker.Item label="Medium" value="medium" />
                  <Picker.Item label="Hard" value="hard" />
                </Picker>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Add Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
  submitButton: {
    flex: 1,
    padding: 15,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});

export default EntryForm;