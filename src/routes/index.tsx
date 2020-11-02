import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
    useTheme,
} from "@ui-kitten/components";
import Dashboard from "../screens/Dashboard";
import Habits from "../screens/Habits";
import Notes from "../screens/Notes";
import Reminders from "../screens/Reminders";
import Login from "../screens/AuthScreen/Login";
import Register from "../screens/AuthScreen/Register";
import NewAction from "../common/components/NewAction";
import { SessionContext } from "../context";

const TabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

const BlankPage = () => null;

const BottomTabBar: React.FC<any> = ({ navigation, state }) => {
    const theme = useTheme();
    return (
        <BottomNavigation
            style={{ height: 75, backgroundColor: theme["color-primary-500"]}}
            indicatorStyle={{
                backgroundColor: theme["color-secondary-600"],
                borderRadius: 5,
                // height: 100,
            }}
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab
                // style={{ backgroundColor: "red", color: "white" }}
                icon={(props) => (
                    <Icon
                        {...props}
                        fill={
                            state.index === 0
                                ? theme["color-secondary-600"]
                                : theme["color-primary-100"]
                        }
                        name="grid-outline"
                    />
                )}
            />
            <BottomNavigationTab
                icon={(props) => (
                    <Icon
                        {...props}
                        fill={
                            state.index === 1
                                ? theme["color-secondary-600"]
                                : theme["color-primary-100"]
                        }
                        name="repeat-outline"
                    />
                )}
            />
            <BottomNavigationTab
                icon={() => <NewAction navigation={navigation} />}
            />
            <BottomNavigationTab
                // style={{ backgroundColor: "white", boird }}
                icon={(props) => (
                    <Icon
                        {...props}
                        fill={
                            state.index === 3
                                ? theme["color-secondary-600"]
                                : theme["color-primary-100"]
                        }
                        name="bulb-outline"
                    />
                )}
            />
            <BottomNavigationTab
                icon={(props) => (
                    <Icon
                        {...props}
                        fill={
                            state.index === 4
                                ? theme["color-secondary-600"]
                                : theme["color-primary-100"]
                        }
                        name="file-text-outline"
                    />
                )}
            />
        </BottomNavigation>
    );
};

const InternalPages = () => (
    <TabNavigator.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <TabNavigator.Screen name="Dashboard" component={Dashboard} />
        <TabNavigator.Screen name="Habits" component={Habits} />
        <TabNavigator.Screen name="Blank" component={BlankPage} />
        <TabNavigator.Screen name="Reminders" component={Reminders} />
        <TabNavigator.Screen name="Notes" component={Notes} />
    </TabNavigator.Navigator>
);

const ExternalPages = () => (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const { session } = useContext(SessionContext);
    return (
        <NavigationContainer>
            {session?.token ? <InternalPages /> : <ExternalPages />}
        </NavigationContainer>
    );
};

export default AppNavigator;
