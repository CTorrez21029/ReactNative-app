import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import NotificationService from '../notifications/NotificationService';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [hambre, setHambre] = useState(true);

  return (
    <>
      <Text>
        Mi nombre es {props.name} y estoy {hambre ? 'Hambriento' : 'Lleno'}
      </Text>
      <Button
        onPress={() => {
          setHambre(false);
        }}
        title={hambre ? 'Dame Comida' : 'Gracias'}
        disabled={!hambre}
      />
    </>
  );
};

const SettingsScreen = () => {
  const sendTestNotification = () => {
    NotificationService.requestPermission();
    NotificationService.showNotification(
      '¡Hola!',
      'Esto es una notificación de prueba',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Configuración!</Text>
      <Cat name="Michi" />
      <Cat name="Tekila" />
      <View style={styles.btnNotification}>
        <Button
          onPress={sendTestNotification}
          title="Enviar Notificación de Prueba"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 18},
  btnNotification: {marginTop: 20},
});

export default SettingsScreen;
