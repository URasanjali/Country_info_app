import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { country } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: country.flags.png }} style={{ width: 200, height: 100 }} />
      <Text>Name: {country.name.common}</Text>
      <Text>Capital: {country.capital?.[0] || 'N/A'}</Text>
      <Text>Region: {country.region}</Text>
      <Text>Subregion: {country.subregion}</Text>
      <Text>Population: {country.population}</Text>
      <Text>Area: {country.area} km²</Text>
      <Text>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Text>
    </ScrollView>
  );
};

export default DetailScreen;
