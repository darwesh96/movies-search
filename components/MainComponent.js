import React, { Component } from 'react';
import Search from './SearchComponent';
import Favorite from "./FavoriteComponent";
import { View, Platform, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';


const SearchStack = createStackNavigator(
  {
    Search: { screen: Search },

  },
);

const FavoriteStack = createStackNavigator(
  {
    Favorite: { screen: Favorite },

  },
);

const App = createBottomTabNavigator(
  {
    Search: { screen: SearchStack },
    Favorites: { screen: FavoriteStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Search') {
          iconName = 'search';
        } else if (routeName === 'Favorites') {
            iconName = 'star';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#e3b04b',
      inactiveTintColor: '#bfbfbf',
      showIcon: true 
    },
  }
);

const BottomNavigation = createAppContainer(App);






class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight * 0 }}>
        <BottomNavigation />
      </View>
    );
  }
}

export default Main;