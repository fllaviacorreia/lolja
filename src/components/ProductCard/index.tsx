// src/components/ProductCard/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

interface ProductCardProps {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  status: string;
  onEdit: () => void;
  onDisable: () => void;
}

export default function ProductCard({
  name,
  brand,
  price,
  quantity,
  status,
  onEdit,
  onDisable,
}: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>Marca: {brand}</Text>
      <Text style={styles.details}>
        {/*Preço: R${typeof price === 'number' ? price.toFixed(2) : 'N/A'}*/}
        Preco:R${Number(price).toFixed(2)}
      </Text>
      <Text style={styles.details}>Quantidade: {quantity}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Feather name="edit" size={16} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDisable} style={styles.actionButton}>
          <Feather name="trash-2" size={16} color="#f44336" />
        </TouchableOpacity>
      </View>
    </View>
    
  );
}
