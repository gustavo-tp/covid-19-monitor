import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

import Panel from './Panel';
import PieChartRender from './PieChartRender';

function OutbreakInfo({ outbreakData }) {
  const [data, setData] = useState();
  const [lastUpdate, setLastUpdate] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    loadSummary();
  }, [outbreakData]);

  async function loadSummary() {
    const { cases, recovered, deaths, updated } = outbreakData;

    setData([cases, recovered, deaths]);

    if (updated) {
      const date = new Date(updated);
      const day = date.getDate();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);

      setLastUpdate(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`);
    } else {
      setLastUpdate('');
    }
  }

  return (
    <>
      <View>
        <Text style={styles.dataSourceDetails}>Data sources from: </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WebViewRender', {
              url: 'https://github.com/NOVELCOVID/API'
            });
          }}
        >
          <Text style={styles.dataSourceReferenceLink}>
            https://github.com/NOVELCOVID/API
          </Text>
        </TouchableOpacity>
        {lastUpdate.length > 0 && (
          <Text style={styles.dataSourceDetails}>
            {`Last update: ${lastUpdate}`}
          </Text>
        )}
      </View>
      {outbreakData.countryInfo && (
        <View style={styles.countryInfo}>
          <Image
            style={styles.countryFlag}
            source={{ uri: outbreakData.countryInfo.flag }}
          />
          <Text style={styles.countryName}>{outbreakData.country}</Text>
        </View>
      )}
      {data && <PieChartRender data={data} />}
      {data && <Panel data={data} />}
    </>
  );
}

const styles = StyleSheet.create({
  dataSourceReferenceLink: {
    fontSize: 15,
    color: '#52BE80',
    textAlign: 'center',
    marginBottom: 10
  },
  dataSourceDetails: {
    fontSize: 15,
    color: '#48C9B0',
    textAlign: 'center'
  },
  countryInfo: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  countryFlag: {
    width: 35,
    height: 35,
    resizeMode: 'center',
    marginRight: 10
  },
  countryName: {
    fontSize: 18,
    color: '#FFF',
    lineHeight: 35
  }
});

export default OutbreakInfo;
