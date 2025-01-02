import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailScreen = () => {
  const route = useRoute();
  const { nombre, apellido } = route.params as { nombre: string; apellido: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos Recibidos</Text>
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>Apellido: {apellido}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  text: { fontSize: 18, marginBottom: 10 },
});

export default DetailScreen;
