import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ClientList from '../screens/ClientList';
import AddClient from '../screens/AddClient';
import ProductList from '../screens/ProductList'; 
import AddProduct from '../screens/AddProduct'; 
import UpdateProduct from '../screens/UpdateProduct'; 
import UpdateClient from '../screens/UpdateClient';
import AddPurchase from '../screens/AddPurchase';
import PurchasesList from '../screens/PurchasesList';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaClientes" component={ClientList} options={{ headerShown: false }} />
      <Stack.Screen name="AddClient" component={AddClient} options={{ title: 'Adicionar Cliente' }} />
      <Stack.Screen name="UpdateClient" component={UpdateClient} options={{ title: 'Atualizar Cliente' }} />
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Lista de Produtos', headerShown: false }} />
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Adicionar Produto' }} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ title: 'Atualizar Produto' }} />
    </Stack.Navigator>
  );
}

function PurchaseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PurchasesList" component={PurchasesList} options={{ title: 'Lista de Compras', headerShown: false }} />
      <Stack.Screen name="AddPurchase" component={AddPurchase} options={{ title: 'Adicionar Compra' }} />
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
        <Tab.Screen name="Compras" component={PurchaseStack} options={{ headerShown: false }} />
        <Tab.Screen name="Produtos" component={ProductStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
