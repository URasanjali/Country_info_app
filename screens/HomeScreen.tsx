import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import CountryCard from '../components/CountryCard';
import { Country } from '../types/Country';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const HomeScreen = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchCountries = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      setCountries(data);
      setFiltered(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCountries().then(() => setRefreshing(false));
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filteredData = countries.filter(c =>
      c.name.common.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search countries..."
        value={search}
        onChangeText={handleSearch}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 }}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name.common}
        renderItem={({ item }) => (
          <CountryCard country={item} onPress={() => navigation.navigate('Details', { country: item })} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default HomeScreen;
