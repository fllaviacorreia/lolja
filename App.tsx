import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientList from './src/screens/ClientList';
import AddClient from './src/screens/AddClient';
import AppNavigator from './src/navigation/AppNavigation';

const Stack = createStackNavigator();

export default function App() {
  return <AppNavigator />;
}
