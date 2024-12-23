import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MovieScreen } from '../screens/movie/movie.screen';
import { TvShowScreen } from '../screens/tv-show/tv-show.screen';
import { FavouriteScreen } from '../screens/favourite/favourite.screen';
import routes from '../constants';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 18,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FF6E46',
        tabBarIconStyle: { display: 'none' },
      })}
    >
      <Tab.Screen name={routes.MOVIE} component={MovieScreen} />
      <Tab.Screen name={routes.TV_SHOW} component={TvShowScreen} />
      <Tab.Screen name={routes.FAVOURITE} component={FavouriteScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
