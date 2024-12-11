import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { RoutesParams } from '../../navigation/RoutesParams';

const BASE_URL = 'http://192.168.1.3:4000';

export default function UpdateProduct() {
  const route = useRoute<RouteProp<RoutesParams, 'UpdateProduct'>>();
  const navigation = useNavigation();
  const { product } = route.params;

  const [name, setName] = useState(product.name || '');
  const [brand, setBrand] = useState(product.brand || '');
  const [price, setPrice] = useState(product.price.toString() || '');
  const [quantity, setQuantity] = useState(product.quantity.toString() || '');

  const handleUpdate = async () => {
    if (!name && !brand && !price && !quantity) {
      Alert.alert('Erro', 'Preencha pelo menos um campo para atualizar.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/products/update/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || undefined,
          brand: brand || undefined,
          price: price ? parseFloat(price) : undefined,
          quantity: quantity ? parseInt(quantity) : undefined,
        }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar produto.');

      Alert.alert('Sucesso', 'Produto atualizado com sucesso.');
      navigation.goBack(); // Retorna à lista
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}
