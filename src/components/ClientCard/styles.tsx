// src/components/ClientCard/styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  actions: {
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 5,
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
  },
});

