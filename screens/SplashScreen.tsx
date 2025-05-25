// import React, { useEffect, useState } from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';

// const images = [
//   require('../assets/splash1.jpg'),
//   require('../assets/splash2.jpg'),
//   require('../assets/splash3.jpg'),
// ];

// const SplashScreen = ({ navigation }: any) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const imageInterval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 2000); // change every 2 seconds

//     const timeout = setTimeout(() => {
//       clearInterval(imageInterval);
//       navigation.replace('Home'); // Navigate to Home screen
//     }, 6000); // total splash time

//     return () => {
//       clearInterval(imageInterval);
//       clearTimeout(timeout);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image source={images[index]} style={styles.image} resizeMode="cover" />

//     </View>
//   );
// };

// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000', // fallback color
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width,
//     height,
//   },
// });

// export default SplashScreen;



import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home'); // Navigate to Home screen
    }, 3000); // show splash for 3 seconds

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
