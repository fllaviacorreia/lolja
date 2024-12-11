import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import { RoutesParams } from '../../navigation/RoutesParams';

const BASE_URL = 'http://192.168.1.3:4000';

type PurchasesListScreenProp = StackNavigationProp<RoutesParams, 'PurchasesList'>;

export default function Purchases({ navigation }: { navigation: PurchasesListScreenProp }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${BASE_URL}/purchases/`);
      if (!response.ok) throw new Error('Erro ao buscar compras');
      const data = await response.json();
      console.log(data);
      setPurchases(data);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
      Alert.alert('Erro', 'Não foi possível carregar as compras.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPurchases();
    }, [])
  );

  const handleCancel = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/purchases/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao cancelar a compra');
      Alert.alert('Sucesso', 'Compra cancelada com sucesso.');
      setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== id));
    } catch (error) {
      console.error('Erro ao cancelar compra:', error.message);
      Alert.alert('Erro', 'Não foi possível cancelar a compra.');
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
      <Text style={styles.title}>Lista de Compras</Text>
      <FlatList
        data={purchases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.details}>Produto ID: {item.id_product}</Text>
            <Text style={styles.details}>Cliente ID: {item.id_client}</Text>
            {/*<Text style={styles.details}>Total: {typeof item.total === 'number' ? item.total.toFixed(2) : 'N/A'}</Text>*/}
            <Text style={styles.details}>Total: R${Number(item.total).toFixed(2)}</Text>
            <Text style={styles.details}>Status: {item.status}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleCancel(item.id)} style={styles.actionButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPurchase')}
      >
        <Text style={styles.buttonText}>Adicionar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}