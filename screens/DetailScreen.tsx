import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { country } = route.params;
  const { isDark } = useTheme();

  const [imageLoading, setImageLoading] = React.useState(true);

  return (
    <LinearGradient colors={isDark ? ['#1c1c1c', '#333'] : ['#004B8D', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.flagContainer}>
            {imageLoading && <ActivityIndicator size="large" color={isDark ? '#fff' : '#004B8D'} style={styles.imageLoader} />}
            <Image
              source={{ uri: country.flags.png }}
              style={styles.flag}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.text}>Name: {country.name.common}</Text>
          <Text style={styles.text}>Capital: {country.capital?.[0] || 'N/A'}</Text>
          <Text style={styles.text}>Region: {country.region}</Text>
          <Text style={styles.text}>Subregion: {country.subregion}</Text>
          <Text style={styles.text}>Population: {country.population}</Text>
          <Text style={styles.text}>Area: {country.area} km²</Text>
          <Text style={styles.text}>
            Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  flagContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  imageLoader: {
    position: 'absolute',
    zIndex: 1,
  },
  flag: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
    fontWeight: '500',
  },
});
