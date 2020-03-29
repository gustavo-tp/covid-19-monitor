import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import LineChart from './pages/LineChart';
import CountriesList from './pages/CountriesList';
import WebViewRender from './pages/WebViewRender';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'COVID-19 Monitor',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#17202A' }
          }}
        />
        <Stack.Screen
          name="LineChart"
          component={LineChart}
          options={{
            title: 'Line Chart',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#17202A' }
          }}
        />
        <Stack.Screen
          name="CountriesList"
          component={CountriesList}
          options={{
            title: 'Countries List',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#17202A' }
          }}
        />
        <Stack.Screen
          name="WebViewRender"
          component={WebViewRender}
          options={{
            title: 'Web View',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#17202A' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
