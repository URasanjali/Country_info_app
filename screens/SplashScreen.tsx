


import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash1.jpg')} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
  },
});

export default SplashScreen;
