// TODO -----------------------------------------------------------------------------------------------
// TODO -----------------------------------------------------------------------------------------------
// TODO -----------------------------------------------------------------------------------------------
// TODO -----------------------------------------------------------------------------------------------

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ToDoScreen from '../screens/ToDoScreen';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos de parámetros para las rutas
export type RootStackParamList = {
  Login: undefined; // Ruta para Login
  Tabs: undefined; // Ruta para las pestañas (Tab Navigator)
  Home: undefined; // Ruta para el Stack Navigator dentro de Home
  Detail: {nombre: string; apellido: string}; // Ruta para Detalle con parámetros
  ToDo: undefined; // Ruta para la pantalla de ToDo
};

// Stack Navigator principal
const Stack = createNativeStackNavigator<RootStackParamList>();

// Bottom Tab Navigator para las pestañas
const Tab = createBottomTabNavigator();

// Home Stack Navigator para manejar navegación dentro de Home
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Inicio'}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{title: 'Detalle'}}
      />
      <Stack.Screen name="ToDo" component={ToDoScreen} options={{title: ''}} />
    </Stack.Navigator>
  );
};

// Componente para las pestañas (Bottom Tabs)
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false, // Ocultar encabezado del Tab Navigator
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      {/* Usamos el HomeStack como componente de la pestaña Home */}
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Stack Navigator principal
const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(authStatus === 'true');
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantalla de inicio de sesión */}

        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
