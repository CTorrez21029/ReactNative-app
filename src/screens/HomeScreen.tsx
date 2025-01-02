import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';

// Definir el tipo para la navegación
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  // Tipar el hook de navegación
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigate = () => {
    if (nombre !== '' || apellido !== '') {
      navigation.navigate('Detail', {nombre, apellido});
    } else {
      Alert.alert('Debes ingresar un nombre y un apellido');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Formulario</Text>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Apellido"
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
          placeholderTextColor="#888"
        />
        <Button title="Enviar" onPress={handleNavigate} />
      </View>
      <View style={styles.container}>
        <Button
          title="Ir a Todo App"
          onPress={() => navigation.navigate('ToDo')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, marginBottom: 20, textAlign: 'center'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
