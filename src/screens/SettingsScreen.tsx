import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

type CatProps = {
  name: string;
}

const Cat = (props: CatProps) => {
  const [hambre, setHambre] = useState(true);

  return (
    <>
      <Text>Mi nombre es {props.name} y estoy {hambre ? 'Hambriento' : 'Lleno'}</Text>
      <Button 
      onPress={() => {
        setHambre(false)
      }}
      title={hambre ? 'Dame Comida' : 'Gracias'}
      disabled= {!hambre}/>
    </>
  )
}
 

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Configuración!</Text>
      <Cat name='Michi'/>
      <Cat name='Tekila'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' },
  text: { fontSize: 18 },
});

export default SettingsScreen;
