import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      console.log('Sesión cerrada');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://imgflip.com/s/meme/Cute-Cat.jpg'}}
        style={styles.image}
      />
      <Text style={styles.text}>¡Tu perfil!</Text>
      <Button title="Cerrar Sesion" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
  image: {
    width: 200,
    height: 200,
  },
});

export default ProfileScreen;
