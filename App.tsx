/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import './src/notifications/firebase-messaging-sw';
import NotificationService from './src/notifications/NotificationService';

const App = () => {
  useEffect(() => {
    // Configura el servicio de notificaciones
    NotificationService.configure();

    // Solicita permisos para notificaciones
    NotificationService.requestPermission();

    // Maneja mensajes en primer plano
    NotificationService.handleForegroundMessages();

    // Maneja mensajes en segundo plano (registrado globalmente)
    NotificationService.handleBackgroundMessages();
  }, []);

  return <AppNavigator />;
};

export default App;
