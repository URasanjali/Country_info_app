import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Country } from '../types/Country';

interface Props {
  country: Country;
  onPress: () => void;
  darkMode: boolean;
}

const CountryCard = ({ country, onPress, darkMode }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.card, { backgroundColor: darkMode ? '#1e1e1e' : '#fff' }]}
  >
    <Image source={{ uri: country.flags.png }} style={styles.flag} />
    <View style={styles.info}>
      <Text style={[styles.name, { color: darkMode ? '#fff' : '#000' }]}>
        {country.name.common}
      </Text>
      <Text style={[styles.details, { color: darkMode ? '#ccc' : '#555' }]}>
        Capital: {country.capital?.[0] || 'N/A'}
      </Text>
      <Text style={[styles.details, { color: darkMode ? '#ccc' : '#555' }]}>
        Region: {country.region}
      </Text>
    </View>
  </TouchableOpacity>
);

export default CountryCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  flag: {
    width: 60,
    height: 40,
    marginRight: 15,
    borderRadius: 4,
  },
  info: {
    flexShrink: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
  },
});
