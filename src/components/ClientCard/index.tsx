// src/components/ClientCard/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

type ClientCardProps = {
  name: string;
  email: string;
  date: string;
  status: string;
  onEdit: () => void;
  onDisable: () => void;
};

const ClientCard = ({ name, email, date, status, onEdit, onDisable }: ClientCardProps) => (
  <View style={[styles.card, status === 'innactive' && styles.inactiveCard]}>
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity onPress={onEdit} style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDisable} style={styles.button}>
        <Text style={styles.buttonText}>Inativar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ClientCard;
