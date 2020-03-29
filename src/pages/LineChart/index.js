import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

import AxesChartRender from '../../components/AxesChartRender';

function Linechart() {
  const [data, setData] = useState();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    loadData();
  }, [route.params]);

  async function loadData() {
    setData(route.params.outbreakData);
  }

  function navigateToCountriesList() {
    navigation.navigate('CountriesList');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonCountries}
        onPress={navigateToCountriesList}
      >
        <Text style={styles.buttonCountriesText}>Show Countries List</Text>
      </TouchableOpacity>
      {data && <AxesChartRender outbreakData={data} />}
    </SafeAreaView>
  );
}

export default Linechart;
