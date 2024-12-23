import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ROUTES from '../constants/routes';
import BottomTabNavigator from './BottomNavigator';
import { MovieDetailsScreen } from '../screens/movie-details.tsx/movie-details.screen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={ROUTES.BOTTON_TABS}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={ROUTES.MOVIE_DETAILS} component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
