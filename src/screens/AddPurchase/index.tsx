import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesParams } from '../../navigation/RoutesParams';
import styles from './styles';

const BASE_URL = 'http://192.168.1.3:4000';

type AddPurchaseScreenProp = StackNavigationProp<RoutesParams, 'AddPurchase'>;

export default function AddPurchase({ navigation }: { navigation: AddPurchaseScreenProp }) {
  const [idProduct, setIdProduct] = useState('');
  const [idClient, setIdClient] = useState('');
  const [total, setTotal] = useState('');

  const handleAddPurchase = async () => {
    if (!idProduct || !idClient || !total) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/purchases/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_product: parseInt(idProduct), id_client: parseInt(idClient), total: parseFloat(total) }),
      });

      if (!response.ok) throw new Error('Erro ao adicionar compra.');

      Alert.alert('Sucesso', 'Compra adicionada com sucesso.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar a compra.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Compra</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Produto"
        value={idProduct}
        onChangeText={setIdProduct}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Cliente"
        value={idClient}
        onChangeText={setIdClient}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Total"
        value={total}
        onChangeText={setTotal}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPurchase}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}