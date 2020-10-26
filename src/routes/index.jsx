import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from '@ui-kitten/components';
import Dashboard from '../screens/Dashboard';
import Notes from '../screens/Notes';
import Reminders from '../screens/Reminders';
import Login from '../screens/AuthScreen/Login';

const TabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();
const user = {};

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="DASHBOARD" />
    <BottomNavigationTab title="NOTES" />
    <BottomNavigationTab title="ORDERSD" />
  </BottomNavigation>
);

const InternalPages = () => (
  <TabNavigator.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <TabNavigator.Screen name="Users" component={Dashboard} />
    <TabNavigator.Screen name="Notes" component={Notes} />
    <TabNavigator.Screen name="Orders" component={Reminders} />
  </TabNavigator.Navigator>
);

const ExternalPages = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    {!user?.token ? <InternalPages /> : <ExternalPages />}
  </NavigationContainer>
);

export default AppNavigator;
