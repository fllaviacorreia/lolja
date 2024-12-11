import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RoutesParams } from '../../navigation/RoutesParams';
import styles from './styles';

const BASE_URL = 'http://192.168.1.3:4000'; 

type UpdateClientScreenProp = StackNavigationProp<RoutesParams, 'UpdateClient'>;
type UpdateClientRouteProp = RouteProp<RoutesParams, 'UpdateClient'>;

interface UpdateClientProps {
  navigation: UpdateClientScreenProp;
  route: UpdateClientRouteProp;
}

export default function UpdateClient({ navigation, route }: UpdateClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);

  const client = route.params?.client;

  useEffect(() => {
    if (client) {
      setName(client.name || '');
      setEmail(client.email || '');
      setBirthDate(client.bornDate || '');
    }
  }, [client]);

  const handleUpdate = async () => {
    if (!name || !email || !birthDate) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      setLoading(true);

      
      const response = await fetch(`${BASE_URL}/clients/update/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          bornDate: birthDate, 
        }),
      });
      console.log({ name, email, bornDate: birthDate });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar o cliente.');
      }

      Alert.alert('Sucesso', 'Cliente atualizado com sucesso.');
      navigation.goBack();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.5 }]}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cancelButton, loading && { opacity: 0.5 }]}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
