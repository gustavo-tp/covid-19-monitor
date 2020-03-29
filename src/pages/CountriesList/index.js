import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

import CountryInfo from '../../components/CountryInfo';

import World from '../../assets/world.svg';

function CountriesList() {
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadCountries();
  }, []);

  async function loadCountries() {
    try {
      setLoading(true);
      const response = await api.get('/countries');

      const countries = response.data;

      const countriesSortedByCasesDesc = countries
        .sort((countryA, countryB) => countryB.cases - countryA.cases)
        .map((item, index) => ({ ...item, position: index + 1 }));

      setAllCountriesList(countriesSortedByCasesDesc);
      setCountriesList(countriesSortedByCasesDesc);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  function filterCountriesByName(name) {
    setSearch(name);

    const countriesFiltered = allCountriesList.filter(item =>
      item.country.includes(name)
    );

    setCountriesList(countriesFiltered);
  }

  function navigateToMain() {
    navigation.navigate('Main', { outbreakData: null });
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              autoCapitalize="words"
              autoCorrect={false}
              value={search}
              onChangeText={filterCountriesByName}
            />
            <TouchableOpacity
              style={styles.globalButton}
              onPress={() => {
                navigateToMain();
              }}
            >
              <World />
            </TouchableOpacity>
          </View>
          <FlatList
            data={countriesList}
            keyExtractor={item => String(item.position)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CountryInfo countryData={item} />}
          />
        </>
      )}
    </View>
  );
}

export default CountriesList;
