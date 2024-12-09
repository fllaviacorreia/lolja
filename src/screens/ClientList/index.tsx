import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../navigation/RoutesParams';
import styles from './styles';
import ClientCard from '../../components/ClientCard';


const BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.4:4000' : 'http://localhost:4000';

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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/clients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar cliente');
      Alert.alert('Sucesso', 'Cliente deletado com sucesso.');
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      Alert.alert('Erro', 'Não foi possível deletar o cliente.');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClientCard
            name={item.name}
            email={item.email}
            date={item.date}
            onEdit={() => navigation.navigate('AddClient', { client: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddClient')}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
