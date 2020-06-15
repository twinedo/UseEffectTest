import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Detail from './Detail';
import DetailMap from './DetailMap2';
import DetailMap3 from './DetailMap3';
import DetailMap4 from './DetailMap4';
import ViewPage from './ViewPage';
import DetailTaskView from './DetailTaskView2';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="DetailMap" component={DetailMap} />
        <Stack.Screen name="DetailMap3" component={DetailMap3} />
        <Stack.Screen name="DetailMap4" component={DetailMap4} />
        <Stack.Screen name="ViewPage" component={ViewPage} />
        <Stack.Screen name="DetailTaskView" component={DetailTaskView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
