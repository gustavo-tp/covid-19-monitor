import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

import OutbreakInfo from '../../components/OutbreakInfo';

function Main() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    loadData();
  }, [route.params]);

  async function loadData() {
    if (!route.params || !route.params.outbreakData) {
      setData(null);
      setLoading(true);
      const response = await api.get('/all');
      setData(response.data);
      setLoading(false);
    } else {
      setData(route.params.outbreakData);
    }
  }

  function navigateToCountriesList() {
    navigation.navigate('CountriesList');
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={styles.buttonCountries}
          onPress={navigateToCountriesList}
        >
          <Text style={styles.buttonCountriesText}>Show Countries List</Text>
        </TouchableOpacity>
      )}
      {data && <OutbreakInfo outbreakData={data} />}
    </SafeAreaView>
  );
}

export default Main;
