import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Maneja mensajes en segundo plano
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Mensaje recibido en segundo plano:', remoteMessage);

  // Aquí puedes manejar el mensaje y mostrar una notificación local
  // Ejemplo:
  PushNotification.localNotification({
    channelId: 'default-channel-id',
    title: remoteMessage.notification?.title || 'Notificación en segundo plano',
    message: remoteMessage.notification?.body || 'Mensaje recibido',
  });
});
