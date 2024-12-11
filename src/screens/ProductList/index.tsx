import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'; // Crie um arquivo de estilos similar ao de clientes
import ProductCard from '../../components/ProductCard'; // Componente que representa um cartão de produto
import { RoutesParams } from '../../navigation/RoutesParams';

// URL base do servidor
const BASE_URL = 'http://192.168.1.3:4000';

type ProductListScreenProp = StackNavigationProp<RoutesParams, 'ProductList'>;

export default function ProductList({ navigation }: { navigation: ProductListScreenProp }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a lista ao focar na tela
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleDisable = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/products/disable/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao inativar o produto');
      Alert.alert('Sucesso', 'Produto inativado com sucesso.');
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, status: 'innactive' } : product
        )
      );
    } catch (error) {
      console.error('Erro ao inativar produto:', error.message);
      Alert.alert('Erro', 'Não foi possível inativar o produto.');
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
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            brand={item.brand}
            price={item.price}
            quantity={item.quantity}
            status={item.status}
            onEdit={() =>
              navigation.navigate('UpdateProduct', {
                product: item,
                onProductUpdated: (updatedProduct) => {
                  // Atualizar produto localmente
                  setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                      product.id === updatedProduct.id ? updatedProduct : product
                    )
                  );
                },
              })
            }
            onDisable={() => handleDisable(item.id)}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
