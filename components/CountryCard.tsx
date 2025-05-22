import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Country } from '../types/Country';

interface Props {
  country: Country;
  onPress: () => void;
}

const CountryCard = ({ country, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', marginBottom: 10 }}>
    <Image source={{ uri: country.flags.png }} style={{ width: 50, height: 30, marginRight: 10 }} />
    <View>
      <Text>{country.name.common}</Text>
      <Text>{country.capital?.[0] || 'No Capital'}</Text>
      <Text>{country.region}</Text>
    </View>
  </TouchableOpacity>
);

export default CountryCard;
