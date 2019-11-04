import React, { Component } from 'react';
import Search from './SearchComponent';
import Favorite from "./FavoriteComponent";
import { View, Platform, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { colors } from "../shared/colors";
import GeneralStatusBarColor from '../UI/statusbar/GeneralStatusBarColor';
// Stack navigation routes for Search Screen
const SearchStack = createStackNavigator(
  {
    Search: { screen: Search },
  },
);

// Stack navigation routes for Favorites Screen
const FavoriteStack = createStackNavigator(
  {
    Favorite: { screen: Favorite },
  },
);

// putting Stack navigations in a bottom navigator with tab bars
const App = createBottomTabNavigator(
  {
    Search: { screen: SearchStack },
    Favorites: { screen: FavoriteStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Search') {
          iconName = 'search';
        } else if (routeName === 'Favorites') {
            iconName = 'star';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: colors.primaryNonDark,
        inactiveTintColor: colors.inactiveTabBar,
        showIcon: true 
      },
    }),
  }
);

// wrapping the bottom navigator in an appcontainer
const BottomNavigation = createAppContainer(App);

class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight * 0 }}>
        <GeneralStatusBarColor backgroundColor={colors.primaryDark}
        barStyle="light-content"/>
        <BottomNavigation />
      </View>
    );
  }
}

export default Main;