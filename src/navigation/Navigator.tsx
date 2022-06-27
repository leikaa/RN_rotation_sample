import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Stacks } from './consts/stacks';
import HomeStack from './stacks/HomeStack';
import { Colors } from '../styles/Colors';
import Navigation from '../base/Navigation';

const Stack = createStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const Navigator = () => {
  return (
    <NavigationContainer ref={Navigation.navigationRef} theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Stacks.HOME_STACK} component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
