import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator'; // Importar el tipo de rutas
import auth from '@react-native-firebase/auth';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(true); // Flag para verificar si el componente está montado
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn) {
        navigation.replace('Tabs'); // Redirigir al Home si está autenticado
      }
    };
    checkAuthStatus();

    return () => {
      setIsMounted(false); // Cuando el componente se desmonte, se actualiza el estado
    };
  }, [navigation]);

  const handleRegister = async () => {
    if (!email || !password) {
      if (isMounted) {
        Alert.alert('Error', 'Todos los campos son obligatorios');
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (isMounted) {
        Alert.alert('Error', 'El correo electrónico no es válido');
      }
      return;
    }

    if (password.length < 6) {
      if (isMounted) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      }
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('Usuario registrado:', userCredential.user);
      navigation.replace('Login'); // Redirige al Login
    } catch (error: any) {
      if (isMounted) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'El correo ya está en uso');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'El correo electrónico no es válido');
        } else {
          Alert.alert('Error', 'Ocurrió un error al crear la cuenta');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <Button title="Registrar" onPress={handleRegister} />
      <View style={styles.link}>
        <Button
          title="Iniciar Sesión"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default RegisterScreen;
