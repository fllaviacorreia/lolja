import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ClientList from '../screens/ClientList';
import AddClient from '../screens/AddClient';
import Purchases from '../screens/Purchases';
import Products from '../screens/Products';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaClientes" component={ClientList} options={{ headerShown: false }} />
      <Stack.Screen name="AddClient" component={AddClient} options={{ title: 'Adicionar Cliente' }} />
    </Stack.Navigator>
  );
}


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = '';

            if (route.name === 'Clientes') {
              iconName = 'users';
            } else if (route.name === 'Compras') {
              iconName = 'shopping-cart';
            } else if (route.name === 'Produtos') {
              iconName = 'package';
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
         <Tab.Screen name="Clientes" component={ClientStack} options={{ headerShown: false }} />

        <Tab.Screen name="Compras" component={Purchases} />
        <Tab.Screen name="Produtos" component={Products} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


