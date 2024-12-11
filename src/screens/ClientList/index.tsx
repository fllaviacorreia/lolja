import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../navigation/RoutesParams';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import ClientCard from '../../components/ClientCard';

// Define a URL base para o seu servidor local
const BASE_URL = 'http://192.168.1.3:4000';

type ClientListScreenProp = StackNavigationProp<RoutesParams, 'ClientList'>;

export default function ClientList({ navigation }: { navigation: ClientListScreenProp }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${BASE_URL}/clients/`);
      if (!response.ok) throw new Error('Erro ao buscar clientes');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    } finally {
      setLoading(false);
    }
  };

  // Atualizar lista ao focar na tela
  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [])
  );

  const handleDisable = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/clients/disable/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'innactive' }),
      });

      if (!response.ok) {
        throw new Error('Erro ao inativar o cliente');
      }

      Alert.alert('Sucesso', 'Cliente inativado com sucesso.');
      console.log('Cliente inativado com sucesso.');
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === id ? { ...client, status: 'innactive' } : client
        )
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      <FlatList
        data={clients}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ClientCard
            name={item.name}
            email={item.email}
            date={item.bornDate}
            status={item.status}
            onEdit={() =>
              navigation.navigate('UpdateClient', {
                client: item,
                onClientUpdated: (updatedClient) => {
                  // Atualizar cliente localmente
                  setClients((prevClients) =>
                    prevClients.map((client) =>
                      client.id === updatedClient.id ? updatedClient : client
                    )
                  );
                },
              })
            }
            onDisable={() => handleDisable(item.id)}
          />
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddClient')}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
