import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  // Configura el servicio de notificaciones
  static configure() {
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('Notification received:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // ID del canal
        channelName: 'Default Channel', // Nombre del canal
        channelDescription: 'A default channel for notifications', // Descripción del canal
        soundName: 'default', // Sonido predeterminado
        // importance: PushNotification.Importance.HIGH, // Prioridad alta
        vibrate: true, // Habilitar vibración
      },
      created => console.log(`Notification channel created: ${created}`),
    );
  }

  // Solicita permisos para notificaciones
  static async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  // Muestra una notificación local
  static showNotification(title: string, message: string) {
    PushNotification.localNotification({
      channelId: 'default-channel-id', // Usar el canal configurado
      title: title,
      message: message,
      priority: 'high',
    });
  }

  // Maneja mensajes en primer plano
  static handleForegroundMessages() {
    messaging().onMessage(async remoteMessage => {
      console.log('Mensaje recibido en primer plano:', remoteMessage);

      // Mostrar notificación local
      this.showNotification(
        remoteMessage.notification?.title || 'Notificación',
        remoteMessage.notification?.body || 'Mensaje recibido',
      );
    });
  }

  // Maneja mensajes en segundo plano
  static handleBackgroundMessages() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Mensaje recibido en segundo plano:', remoteMessage);

      // Mostrar notificación local si es necesario
      this.showNotification(
        remoteMessage.notification?.title || 'Notificación en segundo plano',
        remoteMessage.notification?.body || 'Mensaje recibido en segundo plano',
      );
    });
  }
}

export default NotificationService;
