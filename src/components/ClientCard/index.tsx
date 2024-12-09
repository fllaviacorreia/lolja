// src/components/ClientCard/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

type ClientCardProps = {
  name: string;
  email: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
};

const ClientCard = ({ name, email, date, onEdit, onDelete }: ClientCardProps) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity onPress={onEdit} style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.button}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ClientCard;
