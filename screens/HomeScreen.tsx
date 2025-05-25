import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import CountryCard from '../components/CountryCard';
import { Country } from '../types/Country';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const PAGE_SIZE = 20;

const HomeScreen = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleData, setVisibleData] = useState<Country[]>([]);
  const [page, setPage] = useState(1);

  const { isDark, toggleTheme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchCountries = async () => {
    setError(null);
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = (await res.json()).sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(data);
      setVisibleData(data.slice(0, PAGE_SIZE));
      setPage(1);
    } catch (err) {
      console.error(err);
      setError('Failed to load countries. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCountries();
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(text.toLowerCase())
    );
    setVisibleData(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  };

  const loadMore = () => {
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
    const nextPage = page + 1;
    const newData = filtered.slice(0, nextPage * PAGE_SIZE);
    if (newData.length > visibleData.length) {
      setVisibleData(newData);
      setPage(nextPage);
    }
  };

  const themeStyles = isDark ? darkStyles : lightStyles;

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDark ? '#1c1c1c' : '#e0e0e0' }]}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#004B8D'} />
      </View>
    );
  }

  return (
    <LinearGradient colors={isDark ? ['#333', '#1c1c1c'] : ['#004B8D', '#fff']} style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
          <Text style={styles.toggleButtonText}>{isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search countries..."
          value={search}
          onChangeText={handleSearchChange}
          style={[styles.searchInput, themeStyles.input]}
          placeholderTextColor={isDark ? '#ccc' : '#888'}
        />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCountries}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={visibleData}
          keyExtractor={(item) => item.name.common}
          renderItem={({ item }) => (
            <View style={[styles.cardBox, themeStyles.card]}>
              <CountryCard
                country={item}
                onPress={() => navigation.navigate('Details', { country: item })}
                darkMode={isDark}
              />
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    alignItems: 'flex-end',
    marginTop: 50,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  searchInput: {
    flex: 1,
    padding: 15,
    fontSize: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 12,
  },
  cardBox: {
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const lightStyles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
  },
});

const darkStyles = StyleSheet.create({
  input: {
    backgroundColor: '#222',
    color: '#fff',
  },
  card: {
    backgroundColor: '#333',
  },
});
